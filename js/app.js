/* ========================================
   Kitchenova — Core Application Engine
   ======================================== */

class KitchenovaApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('ck_cart')) || [];
        this.user = JSON.parse(localStorage.getItem('ck_user')) || null;
        this.orders = JSON.parse(localStorage.getItem('ck_orders')) || [];
        this.userRestaurant = JSON.parse(localStorage.getItem('ck_restaurant')) || null;
        this.userMenuItems = JSON.parse(localStorage.getItem('ck_user_menu')) || [];
        this.theme = localStorage.getItem('ck_theme') || 'dark';
        this.isHomePage = document.getElementById('hero') !== null;

        this.init();
    }

    init() {
        this.applyTheme();
        this.setupNavbar();
        this.setupThemeToggle();
        this.setupHamburger();
        this.setupUserUI();
        this.updateCartBadge();
        this.setupLoadingScreen();
        this.setupCursorGlow();

        if (this.isHomePage) {
            this.renderCategories();
            this.renderFeaturedRestaurants();
            this.renderPopularDishes();
            this.renderTestimonials();
            this.setupCounters();
            this.setupNewsletter();
        }
    }

    // === Loading Screen ===
    setupLoadingScreen() {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        }
    }

    // === Cursor Glow ===
    setupCursorGlow() {
        const glow = document.getElementById('cursorGlow');
        if (!glow || window.innerWidth < 768) return;

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    // === Theme ===
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    setupThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('ck_theme', this.theme);
            this.applyTheme();
        });
    }

    // === Navbar ===
    setupNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        if (window.scrollY > 50) navbar.classList.add('scrolled');
    }

    setupHamburger() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // === User UI ===
    setupUserUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.user) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userAvatar) userAvatar.querySelector('span').textContent = this.user.name.charAt(0).toUpperCase();
            if (userName) userName.textContent = this.user.name;
            if (userRole) userRole.textContent = this.user.role;
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        if (userAvatar) {
            userAvatar.addEventListener('click', () => {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) dropdown.classList.toggle('show');
            });
        }
    }

    login(userData) {
        this.user = userData;
        localStorage.setItem('ck_user', JSON.stringify(userData));
        this.setupUserUI();
        this.showToast('success', 'Welcome!', `Logged in as ${userData.name}`);
    }

    logout() {
        this.user = null;
        localStorage.removeItem('ck_user');
        this.setupUserUI();
        this.showToast('info', 'Logged Out', 'See you again soon!');
        setTimeout(() => {
            window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
        }, 1000);
    }

    register(userData) {
        this.user = userData;
        localStorage.setItem('ck_user', JSON.stringify(userData));
        this.showToast('success', 'Account Created!', 'Welcome to Kitchenova!');
    }

    // === Cart ===
    addToCart(item) {
        const existing = this.cart.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.saveCart();
        this.updateCartBadge();
        this.showToast('success', 'Added to Cart!', `${item.name} added`);
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(i => i.id !== itemId);
        this.saveCart();
        this.updateCartBadge();
    }

    updateCartQuantity(itemId, quantity) {
        const item = this.cart.find(i => i.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartBadge();
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('ck_cart', JSON.stringify(this.cart));
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('#cartBadge');
        const count = this.getCartCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // === Orders ===
    placeOrder(orderDetails) {
        const order = {
            id: 'CK-' + Date.now().toString().slice(-6),
            items: [...this.cart],
            total: orderDetails.total,
            status: 'pending',
            date: new Date().toISOString(),
            customer: orderDetails.customer,
            address: orderDetails.address,
            phone: orderDetails.phone,
            payment: orderDetails.payment
        };
        this.orders.unshift(order);
        localStorage.setItem('ck_orders', JSON.stringify(this.orders));
        this.clearCart();
        return order;
    }

    // === Restaurant Management ===
    saveRestaurant(data) {
        this.userRestaurant = data;
        localStorage.setItem('ck_restaurant', JSON.stringify(data));

        // Also add to main restaurants if new
        const exists = AppData.restaurants.find(r => r.id === data.id);
        if (!exists) {
            AppData.restaurants.push(data);
        }
    }

    addMenuItem(item) {
        item.id = Date.now();
        item.restaurantId = this.userRestaurant?.id || 0;
        item.restaurant = this.userRestaurant?.name || 'My Restaurant';
        this.userMenuItems.push(item);
        localStorage.setItem('ck_user_menu', JSON.stringify(this.userMenuItems));

        // Also add to global menu
        AppData.menuItems.push(item);
        return item;
    }

    deleteMenuItem(itemId) {
        this.userMenuItems = this.userMenuItems.filter(i => i.id !== itemId);
        localStorage.setItem('ck_user_menu', JSON.stringify(this.userMenuItems));
    }

    // === Render Home Page Sections ===
    renderCategories() {
        const grid = document.getElementById('categoryGrid');
        if (!grid) return;

        grid.innerHTML = AppData.categories.map((cat, i) => `
            <a href="pages/menu.html?category=${cat.name.toLowerCase()}" class="category-card stagger-item" style="animation-delay: ${i * 0.05}s">
                <span class="category-emoji">${cat.emoji}</span>
                <div class="category-name">${cat.name}</div>
                <div class="category-count">${cat.count}+ items</div>
            </a>
        `).join('');
    }

    renderFeaturedRestaurants() {
        const grid = document.getElementById('restaurantGrid');
        if (!grid) return;

        const featured = AppData.restaurants.filter(r => r.featured).slice(0, 6);
        grid.innerHTML = featured.map((r, i) => this.createRestaurantCard(r, i)).join('');
    }

    createRestaurantCard(r, index = 0) {
        return `
            <div class="restaurant-card stagger-item" style="animation-delay: ${index * 0.1}s" onclick="window.location.href='${window.location.pathname.includes('/pages/') ? '' : 'pages/'}menu.html?restaurant=${r.id}'">
                <div class="restaurant-image">
                    ${r.image ? `<img src="${r.image}" alt="${r.name}">` : r.emoji}
                    ${r.popular ? '<span class="restaurant-badge">🔥 Popular</span>' : ''}
                    <button class="restaurant-favorite" onclick="event.stopPropagation();">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="restaurant-info">
                    <h3 class="restaurant-name">${r.name}</h3>
                    <p class="restaurant-cuisine">${r.cuisine}</p>
                    <div class="restaurant-meta">
                        <span class="meta-item rating">
                            <i class="fas fa-star"></i> ${r.rating}
                            <span style="color: var(--text-muted);">(${r.reviews})</span>
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-clock"></i> ${r.deliveryTime}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-dollar-sign"></i> Min $${r.minOrder}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    renderPopularDishes() {
        const grid = document.getElementById('dishesCarousel');
        if (!grid) return;

        const popular = AppData.menuItems.filter(d => d.popular).slice(0, 8);
        grid.innerHTML = popular.map((d, i) => this.createDishCard(d, i)).join('');
    }

    createDishCard(d, index = 0) {
        return `
            <div class="dish-card stagger-item" style="animation-delay: ${index * 0.08}s">
                <div class="dish-image">
                    ${d.emoji}
                    <div class="dish-tags">
                        ${d.veg ? '<span class="dish-tag veg">🌱 Veg</span>' : ''}
                        ${d.spicy ? '<span class="dish-tag spicy">🌶️ Spicy</span>' : ''}
                        ${d.popular ? '<span class="dish-tag popular">⭐ Popular</span>' : ''}
                    </div>
                </div>
                <div class="dish-info">
                    <h3 class="dish-name">${d.name}</h3>
                    <p class="dish-restaurant">${d.restaurant}</p>
                    <p class="dish-description">${d.description}</p>
                    <div class="dish-footer">
                        <span class="dish-price">$${d.price.toFixed(2)}</span>
                        <button class="btn-add-cart" onclick="app.addToCart({id:${d.id},name:'${d.name.replace(/'/g, "\\'")}',price:${d.price},emoji:'${d.emoji}',restaurant:'${d.restaurant.replace(/'/g, "\\'")}'})" title="Add to Cart">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderTestimonials() {
        const grid = document.getElementById('testimonialGrid');
        if (!grid) return;

        grid.innerHTML = AppData.testimonials.map((t, i) => `
            <div class="testimonial-card stagger-item" style="animation-delay: ${i * 0.1}s">
                <i class="fas fa-quote-right testimonial-quote"></i>
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${t.avatar}</div>
                    <div>
                        <div class="testimonial-name">${t.name}</div>
                        <div class="testimonial-role">${t.role}</div>
                    </div>
                </div>
                <div class="testimonial-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                <p class="testimonial-text">"${t.text}"</p>
            </div>
        `).join('');
    }

    // === Counter Animation ===
    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current >= 1000
                ? Math.floor(current / 1000) + 'K+'
                : Math.floor(current) + '+';
        }, 16);
    }

    // === Newsletter ===
    setupNewsletter() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            this.showToast('success', 'Subscribed!', `Welcome aboard! Check ${email} for your 20% off code.`);
            form.reset();
        });
    }

    // === Toast Notifications ===
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fa-check',
            error: 'fa-times',
            warning: 'fa-exclamation',
            info: 'fa-info'
        };

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon ${type}"><i class="fas ${icons[type]}"></i></div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 3000);
    }
}

// Initialize App
const app = new KitchenovaApp();
