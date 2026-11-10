// Get existing accounts from local storage or initialize empty array
let accountsList = JSON.parse(localStorage.getItem('accountsList')) || [];

// Handle registration form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const feedback = document.getElementById('feedback');

        // Check if email already exists using some()
        const checkEmail = accountsList.some(acc => acc.email === email);
        if (checkEmail) {
            feedback.textContent = "Email is already registered!";
            feedback.className = "message error";
            return;
        }

        // Create new user object
        const newMember = {
            idNo: Date.now(),
            fullname: fullname,
            email: email,
            password: password
        };

        // Save to array and local storage
        accountsList.push(newMember);
        localStorage.setItem('accountsList', JSON.stringify(accountsList));

        feedback.textContent = "Registration successful! Redirecting...";
        feedback.className = "message success";

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    });
}

// Handle login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const loginFeedback = document.getElementById('loginFeedback');

        // Find user in array using find()
        const foundUser = accountsList.find(acc => acc.email === email && acc.password === password);

        if (foundUser) {
            loginFeedback.textContent = "Login successful!";
            loginFeedback.className = "message success";

            // Save active session
            localStorage.setItem('activeUser', JSON.stringify(foundUser));

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            loginFeedback.textContent = "Invalid email or password.";
            loginFeedback.className = "message error";
        }
    });
}