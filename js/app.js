// Dashboard script for loading user list
document.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const welcomeUser = document.getElementById('welcomeUser');

    // Protect dashboard route
    if (!activeUser && window.location.pathname.includes('dashboard.html')) {
        alert("Please login first!");
        window.location.href = 'login.html';
        return;
    }

    if (welcomeUser && activeUser) {
        welcomeUser.textContent = `Welcome, ${activeUser.fullname}!`;
    }

    // Load saved data and render table
    const accountsList = JSON.parse(localStorage.getItem('accountsList')) || [];
    const userTableBody = document.getElementById('userTableBody');

    if (userTableBody) {
        userTableBody.innerHTML = "";

        // Loop through array using forEach
        accountsList.forEach((acc, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${acc.fullname}</td>
                <td>${acc.email}</td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Handle logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('activeUser');
            window.location.href = 'login.html';
        });
    }
});