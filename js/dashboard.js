/* ========================================
   CLOUD KITCHEN — Dashboard Page Logic
   ======================================== */

(function() {
    const dashTabs = document.querySelectorAll('.dash-tab');
    const tabContents = document.querySelectorAll('.dash-tab-content');
    const restaurantForm = document.getElementById('restaurantForm');
    const menuItemForm = document.getElementById('menuItemForm');
    const menuItemsList = document.getElementById('menuItemsList');
    const emptyMenu = document.getElementById('emptyMenu');
    const ordersList = document.getElementById('ordersList');
    const emptyOrders = document.getElementById('emptyOrders');

    if (!dashTabs.length) return;

    // Check login
    if (!app.user) {
        app.showToast('warning', 'Login Required', 'Please login to access the dashboard');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // === Tab Switching ===
    dashTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dashTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById('tab-' + tab.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // === Load Stats ===
    function updateStats() {
        const orders = app.orders || [];
        const menuItems = app.userMenuItems || [];

        const totalOrdersEl = document.getElementById('totalOrders');
        const totalRevenueEl = document.getElementById('totalRevenue');
        const totalItemsEl = document.getElementById('totalItems');
        const avgRatingEl = document.getElementById('avgRating');

        if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
        if (totalRevenueEl) {
            const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
            totalRevenueEl.textContent = '$' + revenue.toFixed(0);
        }
        if (totalItemsEl) totalItemsEl.textContent = menuItems.length;
        if (avgRatingEl) avgRatingEl.textContent = app.userRestaurant?.rating || '4.5';
    }

    // === Restaurant Form ===
    if (restaurantForm) {
        // Pre-fill if exists
        if (app.userRestaurant) {
            document.getElementById('restName').value = app.userRestaurant.name || '';
            document.getElementById('restCuisine').value = app.userRestaurant.cuisine || '';
            document.getElementById('restAddress').value = app.userRestaurant.address || '';
            document.getElementById('restPhone').value = app.userRestaurant.phone || '';
            document.getElementById('restDescription').value = app.userRestaurant.description || '';
            document.getElementById('restDeliveryTime').value = parseInt(app.userRestaurant.deliveryTime) || '';
            document.getElementById('restMinOrder').value = app.userRestaurant.minOrder || '';
            document.getElementById('restImage').value = app.userRestaurant.image || '';
        }

        restaurantForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                id: app.userRestaurant?.id || Date.now(),
                name: document.getElementById('restName').value.trim(),
                cuisine: document.getElementById('restCuisine').value,
                address: document.getElementById('restAddress').value.trim(),
                phone: document.getElementById('restPhone').value.trim(),
                description: document.getElementById('restDescription').value.trim(),
                deliveryTime: document.getElementById('restDeliveryTime').value + ' min',
                minOrder: parseFloat(document.getElementById('restMinOrder').value) || 10,
                image: document.getElementById('restImage').value.trim() || null,
                rating: app.userRestaurant?.rating || 4.5,
                reviews: app.userRestaurant?.reviews || 0,
                emoji: getCuisineEmoji(document.getElementById('restCuisine').value),
                featured: false,
                popular: false
            };

            app.saveRestaurant(data);
            app.showToast('success', 'Restaurant Saved!', `${data.name} has been saved successfully`);
            updateStats();
        });
    }

    function getCuisineEmoji(cuisine) {
        const emojis = {
            indian: '🍛', italian: '🍕', chinese: '🥡', japanese: '🍣',
            mexican: '🌮', american: '🍔', thai: '🍜', mediterranean: '🥙', multi: '🍽️'
        };
        return emojis[cuisine] || '🍽️';
    }

    // === Menu Item Form ===
    if (menuItemForm) {
        menuItemForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!app.userRestaurant) {
                app.showToast('warning', 'Save Restaurant First', 'Please save your restaurant details first');
                dashTabs[0]?.click();
                return;
            }

            const item = {
                name: document.getElementById('itemName').value.trim(),
                category: document.getElementById('itemCategory').value,
                price: parseFloat(document.getElementById('itemPrice').value),
                emoji: document.getElementById('itemEmoji').value || '🍽️',
                description: document.getElementById('itemDescription').value.trim(),
                image: document.getElementById('itemImage').value.trim() || null,
                veg: document.getElementById('itemVeg').checked,
                spicy: document.getElementById('itemSpicy').checked,
                popular: document.getElementById('itemPopular').checked,
                rating: 4.5
            };

            const saved = app.addMenuItem(item);
            app.showToast('success', 'Item Added!', `${item.name} added to your menu`);
            menuItemForm.reset();
            renderMenuItems();
            updateStats();
        });
    }

    // === Render Menu Items ===
    function renderMenuItems() {
        if (!menuItemsList) return;

        const items = app.userMenuItems;

        if (items.length === 0) {
            menuItemsList.innerHTML = '';
            if (emptyMenu) emptyMenu.classList.remove('hidden');
            return;
        }

        if (emptyMenu) emptyMenu.classList.add('hidden');

        menuItemsList.innerHTML = items.map(item => `
            <div class="menu-item-row" data-id="${item.id}">
                <div class="menu-item-emoji">${item.emoji}</div>
                <div class="menu-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category} ${item.veg ? '• 🌱 Veg' : ''} ${item.spicy ? '• 🌶️ Spicy' : ''}</p>
                </div>
                <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                <div class="menu-item-actions">
                    <button class="btn-icon delete" onclick="deleteMenuItem(${item.id})" title="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.deleteMenuItem = function(itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            app.deleteMenuItem(itemId);
            renderMenuItems();
            updateStats();
            app.showToast('info', 'Item Deleted', 'Menu item removed');
        }
    };

    // === Render Orders ===
    function renderOrders() {
        if (!ordersList) return;

        const orders = app.orders;

        if (orders.length === 0) {
            ordersList.innerHTML = '';
            if (emptyOrders) emptyOrders.classList.remove('hidden');
            return;
        }

        if (emptyOrders) emptyOrders.classList.add('hidden');

        ordersList.innerHTML = orders.map(order => {
            const itemsSummary = order.items.map(i => `${i.emoji} ${i.name} × ${i.quantity}`).join(', ');
            const date = new Date(order.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            return `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">${order.id}</span>
                        <span class="order-status ${order.status}">${order.status}</span>
                    </div>
                    <p class="order-items-summary">${itemsSummary}</p>
                    <div class="order-footer">
                        <span class="order-total">$${order.total.toFixed(2)}</span>
                        <span class="order-date">${date}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial
    updateStats();
    renderMenuItems();
    renderOrders();
})();
