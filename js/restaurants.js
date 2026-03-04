/* ========================================
   Dishara — Restaurants Page Logic
   ======================================== */

(function() {
    const grid = document.getElementById('restaurantGrid');
    const searchInput = document.getElementById('searchRestaurants');
    const cuisineFilter = document.getElementById('cuisineFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const sortFilter = document.getElementById('sortFilter');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    if (!grid) return;

    let allRestaurants = [];

    // Show loading state
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem"><div style="font-size:2rem;margin-bottom:0.5rem">⏳</div><p style="color:var(--text-muted)">Loading restaurants...</p></div>`;

    // Real-time listener from Firestore
    DB.onRestaurants(restaurants => {
        allRestaurants = restaurants;
        filterAndSort();
    });

    function renderRestaurants(restaurants) {
        if (restaurants.length === 0) {
            const isFiltered = searchInput?.value || cuisineFilter?.value || ratingFilter?.value;
            grid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:5rem 1rem;">
                    <div style="font-size:3.5rem; margin-bottom:1rem">${isFiltered ? '🔍' : '🏦'}</div>
                    <h3 style="color:var(--text-primary); margin-bottom:0.5rem">
                        ${isFiltered ? 'No restaurants match your search' : 'No Restaurants Listed Yet'}
                    </h3>
                    <p style="color:var(--text-muted)">
                        ${isFiltered ? 'Try different filters or search terms' : 'Be the first to list your restaurant on Dishara!'}
                    </p>
                    ${!isFiltered ? `<a href="register.html" class="btn btn-primary" style="margin-top:1.5rem; display:inline-flex"><i class="fas fa-plus"></i> List Your Restaurant</a>` : ''}
                </div>`;
            if (noResults) noResults.classList.add('hidden');
            if (resultsCount) resultsCount.textContent = '0';
            return;
        }

        if (noResults) noResults.classList.add('hidden');
        if (resultsCount) resultsCount.textContent = restaurants.length;

        grid.innerHTML = restaurants.map((r, i) => app.createRestaurantCard(r, i)).join('');
    }

    function filterAndSort() {
        let filtered = [...allRestaurants];

        // Search
        const query = searchInput?.value.toLowerCase().trim();
        if (query) {
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(query) ||
                r.cuisine.toLowerCase().includes(query) ||
                r.description?.toLowerCase().includes(query)
            );
        }

        // Cuisine filter
        const cuisine = cuisineFilter?.value;
        if (cuisine) {
            filtered = filtered.filter(r => r.cuisine === cuisine);
        }

        // Rating filter
        const minRating = parseFloat(ratingFilter?.value);
        if (minRating) {
            filtered = filtered.filter(r => r.rating >= minRating);
        }

        // Sort
        const sort = sortFilter?.value;
        switch (sort) {
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'delivery':
                filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.minOrder - b.minOrder);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.minOrder - a.minOrder);
                break;
            default: // popular
                filtered.sort((a, b) => b.reviews - a.reviews);
        }

        renderRestaurants(filtered);
    }

    // Event listeners
    searchInput?.addEventListener('input', filterAndSort);
    cuisineFilter?.addEventListener('change', filterAndSort);
    ratingFilter?.addEventListener('change', filterAndSort);
    sortFilter?.addEventListener('change', filterAndSort);
})();
