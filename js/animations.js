/* ========================================
   Kitchenova — Scroll Animations
   ======================================== */

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right').forEach(el => {
            observer.observe(el);
        });

        // Stagger items observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('.stagger-item').forEach(el => {
            staggerObserver.observe(el);
        });

        // Navbar scroll effect
        this.setupScrollEffects();
    }

    setupScrollEffects() {
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Show/hide navbar on scroll direction
            if (currentScroll > 500) {
                if (currentScroll > lastScroll) {
                    navbar?.style.setProperty('transform', 'translateY(-100%)');
                } else {
                    navbar?.style.setProperty('transform', 'translateY(0)');
                }
            } else {
                navbar?.style.setProperty('transform', 'translateY(0)');
            }

            lastScroll = currentScroll;
        });
    }
}

// Initialize
new ScrollAnimations();
