/* ========================================
   Dishara — Auth (Login/Register) Logic
   ======================================== */

(function() {
    // === Login ===
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Demo buttons
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.dataset.email;
                const password = btn.dataset.password;
                const role = btn.dataset.role;

                document.getElementById('loginEmail').value = email;
                document.getElementById('loginPassword').value = password;

                // Auto login
                const userData = {
                    name: role === 'owner' ? 'Chef Gordon' : 'John Doe',
                    email: email,
                    role: role,
                    phone: '+1 555-0123'
                };

                app.login(userData);

                setTimeout(() => {
                    window.location.href = role === 'owner' ? 'dashboard.html' : '../index.html';
                }, 1000);
            });
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                app.showToast('error', 'Missing Fields', 'Please fill in all fields');
                return;
            }

            // Simulate login
            const userData = {
                name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User',
                email: email,
                role: email.includes('owner') ? 'owner' : 'customer',
                phone: ''
            };

            app.login(userData);

            setTimeout(() => {
                window.location.href = userData.role === 'owner' ? 'dashboard.html' : '../index.html';
            }, 1000);
        });
    }

    // === Register ===
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Password strength
        const passwordInput = document.getElementById('regPassword');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const val = passwordInput.value;
                let strength = 0;
                let label = 'Weak';
                let color = '#ef4444';

                if (val.length >= 6) strength++;
                if (val.length >= 8) strength++;
                if (/[A-Z]/.test(val)) strength++;
                if (/[0-9]/.test(val)) strength++;
                if (/[^A-Za-z0-9]/.test(val)) strength++;

                if (strength <= 1) { label = 'Weak'; color = '#ef4444'; }
                else if (strength <= 2) { label = 'Fair'; color = '#f59e0b'; }
                else if (strength <= 3) { label = 'Good'; color = '#3b82f6'; }
                else { label = 'Strong'; color = '#10b981'; }

                const percent = (strength / 5) * 100;
                if (strengthFill) {
                    strengthFill.style.width = percent + '%';
                    strengthFill.style.background = color;
                }
                if (strengthText) {
                    strengthText.textContent = label;
                    strengthText.style.color = color;
                }
            });
        }

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const role = document.querySelector('input[name="role"]:checked')?.value || 'customer';
            const agreed = document.getElementById('agreeTerms')?.checked;

            if (!name || !phone || !email || !password || !confirmPassword) {
                app.showToast('error', 'Missing Fields', 'Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                app.showToast('error', 'Password Mismatch', 'Passwords do not match');
                return;
            }

            if (password.length < 6) {
                app.showToast('error', 'Weak Password', 'Password must be at least 6 characters');
                return;
            }

            if (!agreed) {
                app.showToast('warning', 'Terms Required', 'Please agree to the terms');
                return;
            }

            const userData = {
                name: name,
                email: email,
                phone: phone,
                role: role
            };

            app.register(userData);

            setTimeout(() => {
                window.location.href = role === 'owner' ? 'dashboard.html' : '../index.html';
            }, 1200);
        });
    }

    // === Toggle Password Visibility ===
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
})();
