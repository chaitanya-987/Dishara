/* ========================================
   Dishara — Orders Page Logic
   ======================================== */

(function() {
    const ordersListEl = document.getElementById('ordersListPage');
    const emptyOrders = document.getElementById('emptyOrders');

    if (!ordersListEl) return;

    // Show loading
    ordersListEl.innerHTML = `<div style="text-align:center;padding:3rem"><div style="font-size:2rem;margin-bottom:0.5rem">⏳</div><p style="color:var(--text-muted)">Loading orders...</p></div>`;
    if (emptyOrders) emptyOrders.classList.add('hidden');

    // Get user id
    const userId = app.user?.id || null;

    // Load from Firestore, fallback to localStorage
    DB.getOrders(userId).then(firestoreOrders => {
        const localOrders = JSON.parse(localStorage.getItem('dishara_orders')) || [];
        // Merge: prefer Firestore, fill with local if empty
        const orders = firestoreOrders.length ? firestoreOrders : localOrders;
        renderOrders(orders);
    }).catch(() => {
        const orders = JSON.parse(localStorage.getItem('dishara_orders')) || [];
        renderOrders(orders);
    });

    function renderOrders(orders) {

    if (orders.length === 0) {
        ordersListEl.innerHTML = '';
        if (emptyOrders) emptyOrders.classList.remove('hidden');
        return;
    }

    if (emptyOrders) emptyOrders.classList.add('hidden');

    // Simulate order status progression
    const statuses = ['pending', 'preparing', 'delivered'];

    ordersListEl.innerHTML = orders.map((order, idx) => {
        // Give recent orders dynamic statuses
        let status = order.status;
        if (idx === 0 && status === 'pending') status = 'preparing';
        if (idx > 1) status = 'delivered';

        const itemsSummary = order.items.map(i => `${i.emoji} ${i.name} × ${i.quantity}`).join(', ');
        const date = new Date(order.date).toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        const statusLabels = {
            pending: '⏳ Pending',
            preparing: '👨‍🍳 Preparing',
            delivered: '✅ Delivered',
            cancelled: '❌ Cancelled'
        };

        // Order progress
        const progressSteps = [
            { icon: 'fa-check', label: 'Confirmed', done: true },
            { icon: 'fa-fire', label: 'Preparing', done: status === 'preparing' || status === 'delivered' },
            { icon: 'fa-truck', label: 'On the way', done: status === 'delivered' },
            { icon: 'fa-home', label: 'Delivered', done: status === 'delivered' }
        ];

        return `
            <div class="order-card glass-card stagger-item" style="animation-delay: ${idx * 0.1}s">
                <div class="order-header">
                    <div>
                        <span class="order-id">${order.id}</span>
                        <span class="order-date" style="margin-left: 1rem;">${date}</span>
                    </div>
                    <span class="order-status ${status}">${statusLabels[status] || status}</span>
                </div>
                <p class="order-items-summary">${itemsSummary}</p>

                <!-- Order Progress Bar -->
                <div style="display: flex; justify-content: space-between; margin: 1.25rem 0 0.75rem; position: relative;">
                    <div style="position: absolute; top: 15px; left: 5%; right: 5%; height: 3px; background: var(--glass-border); z-index: 0;">
                        <div style="height: 100%; background: var(--gradient-primary); border-radius: 3px; width: ${status === 'delivered' ? '100%' : status === 'preparing' ? '50%' : '15%'}; transition: width 1s ease;"></div>
                    </div>
                    ${progressSteps.map(step => `
                        <div style="text-align: center; position: relative; z-index: 1;">
                            <div style="width: 32px; height: 32px; border-radius: 50%; background: ${step.done ? 'var(--gradient-primary)' : 'var(--bg-primary)'}; border: 2px solid ${step.done ? 'var(--primary)' : 'var(--glass-border)'}; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.25rem; font-size: 0.7rem; color: ${step.done ? 'white' : 'var(--text-muted)'};">
                                <i class="fas ${step.icon}"></i>
                            </div>
                            <small style="font-size: 0.65rem; color: ${step.done ? 'var(--primary)' : 'var(--text-muted)'};">${step.label}</small>
                        </div>
                    `).join('')}
                </div>

                <div class="order-footer">
                    <span class="order-total">Total: $${order.total.toFixed(2)}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">
                        <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
                        ${order.address || 'Address on file'}
                    </span>
                </div>
            </div>
        `;
    }).join('');
    } // end renderOrders
})();
