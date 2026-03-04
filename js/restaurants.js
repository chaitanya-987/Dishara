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

    // Combine default and user-added restaurants
    let allRestaurants = [...AppData.restaurants];
    const userRest = JSON.parse(localStorage.getItem('dishara_restaurant'));
    if (userRest && !allRestaurants.find(r => r.id === userRest.id)) {
        allRestaurants.push(userRest);
    }

    function renderRestaurants(restaurants) {
        if (restaurants.length === 0) {
            grid.innerHTML = '';
            if (noResults) noResults.classList.remove('hidden');
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

    // Initial render
    filterAndSort();
})();
