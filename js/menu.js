/* ========================================
   Dishara — Menu Page Logic
   ======================================== */

(function() {
    const grid = document.getElementById('menuGrid');
    const tabs = document.querySelectorAll('.menu-tab');

    if (!grid) return;

    // Get URL params
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const restaurantParam = params.get('restaurant');

    // Combine all menu items (default + user added)
    let allItems = [...AppData.menuItems];
    const userItems = JSON.parse(localStorage.getItem('dishara_user_menu')) || [];
    allItems = [...allItems, ...userItems];

    function renderMenu(category) {
        let items = allItems;

        // Filter by restaurant if param exists
        if (restaurantParam) {
            items = items.filter(i => i.restaurantId === parseInt(restaurantParam));
        }

        // Filter by category
        if (category && category !== 'all') {
            items = items.filter(i => i.category === category);
        }

        if (items.length === 0) {
            grid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:5rem 1rem;">
                    <div style="font-size:3.5rem; margin-bottom:1rem">🍽️</div>
                    <h3 style="color:var(--text-primary); margin-bottom:0.5rem">No Dishes Available Yet</h3>
                    <p style="color:var(--text-muted)">
                        ${restaurantParam ? 'This restaurant has not added any dishes yet.' : 'No dishes have been added in this category yet.'}
                    </p>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-top:0.5rem">Restaurant owners can add dishes from the <a href="dashboard.html" style="color:var(--primary)">Dashboard</a></p>
                </div>`;
            return;
        }

        grid.innerHTML = items.map((d, i) => app.createDishCard(d, i)).join('');
    }

    // Tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.category);
        });
    });

    // Set active tab from URL param
    if (categoryParam) {
        tabs.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.category === categoryParam) {
                t.classList.add('active');
            }
        });
        renderMenu(categoryParam);
    } else {
        renderMenu('all');
    }

    // If restaurant param, show restaurant name
    if (restaurantParam) {
        const rest = AppData.restaurants.find(r => r.id === parseInt(restaurantParam));
        if (rest) {
            const titleEl = document.querySelector('.page-title');
            const subtitleEl = document.querySelector('.page-subtitle');
            if (titleEl) titleEl.innerHTML = `${rest.emoji} <span class="gradient-text">${rest.name}</span>`;
            if (subtitleEl) subtitleEl.textContent = `${rest.cuisine} • ⭐ ${rest.rating} • ${rest.deliveryTime}`;
        }
    }
})();
