/* ========================================
   Dishara — Cart Page Logic
   ======================================== */

(function() {
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const summaryItems = document.getElementById('summaryItems');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const taxEl = document.getElementById('taxAmount');
    const totalEl = document.getElementById('totalAmount');
    const discountRow = document.getElementById('discountRow');
    const discountEl = document.getElementById('discountAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const promoBtn = document.getElementById('applyPromo');
    const promoInput = document.getElementById('promoCode');
    const orderSummary = document.getElementById('orderSummary');
    const orderSuccessModal = document.getElementById('orderSuccessModal');

    if (!cartItemsEl) return;

    let appliedDiscount = 0;
    let discountType = null;
    const DELIVERY_FEE = 2.99;
    const TAX_RATE = 0.08;

    function renderCart() {
        if (app.cart.length === 0) {
            cartItemsEl.innerHTML = '';
            if (emptyCart) emptyCart.classList.remove('hidden');
            if (orderSummary) orderSummary.style.display = 'none';
            return;
        }

        if (emptyCart) emptyCart.classList.add('hidden');
        if (orderSummary) orderSummary.style.display = 'block';

        cartItemsEl.innerHTML = app.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-restaurant">${item.restaurant}</p>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="cart-item-remove" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');

        updateSummary();
    }

    function updateSummary() {
        const subtotal = app.getCartTotal();
        const tax = subtotal * TAX_RATE;
        let discount = 0;

        if (appliedDiscount > 0) {
            if (discountType === 'percent') {
                discount = subtotal * (appliedDiscount / 100);
            } else {
                discount = Math.min(appliedDiscount, subtotal);
            }
            if (discountRow) discountRow.classList.remove('hidden');
            if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
        } else {
            if (discountRow) discountRow.classList.add('hidden');
        }

        const total = subtotal + DELIVERY_FEE + tax - discount;

        // Summary items
        if (summaryItems) {
            summaryItems.innerHTML = app.cart.map(item => `
                <div class="summary-item">
                    <span>${item.emoji} ${item.name} × ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (deliveryFeeEl) deliveryFeeEl.textContent = `$${DELIVERY_FEE.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // Global functions for onclick handlers
    window.updateQty = function(itemId, newQty) {
        if (newQty < 1) {
            removeItem(itemId);
            return;
        }
        app.updateCartQuantity(itemId, newQty);
        app.saveCart();
        app.updateCartBadge();
        renderCart();
    };

    window.removeItem = function(itemId) {
        const el = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        if (el) {
            el.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                app.removeFromCart(itemId);
                renderCart();
            }, 300);
        } else {
            app.removeFromCart(itemId);
            renderCart();
        }
    };

    // Promo code
    if (promoBtn) {
        promoBtn.addEventListener('click', () => {
            const code = promoInput?.value.trim().toUpperCase();
            if (!code) return;

            const promo = AppData.promoCodes[code];
            if (promo) {
                appliedDiscount = promo.discount;
                discountType = promo.type;
                updateSummary();
                app.showToast('success', 'Promo Applied!', promo.description);
                promoInput.disabled = true;
                promoBtn.disabled = true;
                promoBtn.textContent = 'Applied ✓';
            } else {
                app.showToast('error', 'Invalid Code', 'This promo code is not valid');
                promoInput.style.animation = 'shake 0.5s';
                setTimeout(() => promoInput.style.animation = '', 500);
            }
        });
    }

    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (app.cart.length === 0) {
                app.showToast('warning', 'Cart Empty', 'Add items to proceed');
                return;
            }
            checkoutBtn.classList.add('hidden');
            if (checkoutForm) checkoutForm.classList.remove('hidden');
            checkoutForm?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Place Order
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const name = document.getElementById('checkoutName')?.value.trim();
            const address = document.getElementById('checkoutAddress')?.value.trim();
            const phone = document.getElementById('checkoutPhone')?.value.trim();
            const payment = document.querySelector('input[name="payment"]:checked')?.value;

            if (!name || !address || !phone) {
                app.showToast('error', 'Missing Details', 'Please fill in all delivery details');
                return;
            }

            const subtotal = app.getCartTotal();
            const tax = subtotal * TAX_RATE;
            let discount = 0;
            if (appliedDiscount > 0) {
                discount = discountType === 'percent' ? subtotal * (appliedDiscount / 100) : Math.min(appliedDiscount, subtotal);
            }
            const total = subtotal + DELIVERY_FEE + tax - discount;

            const order = app.placeOrder({
                total: total,
                customer: name,
                address: address,
                phone: phone,
                payment: payment,
                userId: app.user?.id || 'guest',
                restaurantId: app.cart[0] ? String(app.cart[0].restaurantId || '') : ''
            });

            // Save to Firestore
            DB.saveOrder(order).then(() => {
                console.log('[Dishara] Order saved to Firestore:', order.id);
            }).catch(err => {
                console.warn('[Dishara] Firestore order save failed, stored locally:', err);
            });

            // Show success modal
            if (orderSuccessModal) {
                const orderId = document.getElementById('orderId');
                if (orderId) orderId.textContent = order.id;
                orderSuccessModal.classList.remove('hidden');
            }

            // Reset
            appliedDiscount = 0;
            discountType = null;
            renderCart();
        });
    }

    // Close modal
    if (orderSuccessModal) {
        orderSuccessModal.querySelector('.modal-overlay')?.addEventListener('click', () => {
            orderSuccessModal.classList.add('hidden');
        });
    }

    // Initial render
    renderCart();
})();
