```javascript
// ========================================
// INVEST INDIA - AUTHENTICATION
// Frontend Only | localStorage
// File: js/auth.js
// ========================================


// ========================================
// GET REGISTERED USER
// ========================================

function getRegisteredUser() {

    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");
    const name = localStorage.getItem("userName");

    if (!email || !password) {
        return null;
    }

    return {
        name: name || "",
        email: email.trim().toLowerCase(),
        password: password
    };
}


// ========================================
// SAVE USER DETAILS
// ========================================

function saveUserDetails(name, email, password) {

    const normalizedEmail = email.trim().toLowerCase();

    // Save registration details
    localStorage.setItem("userName", name.trim());
    localStorage.setItem("userEmail", normalizedEmail);
    localStorage.setItem("userPassword", password);

    // Save details for profile page
    const investmentUser = {
        name: name.trim(),
        email: normalizedEmail
    };

    localStorage.setItem(
        "investmentUser",
        JSON.stringify(investmentUser)
    );
}


// ========================================
// REGISTER
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", registerUser);

}


function registerUser(event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail")
        .value.trim().toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const confirmPasswordElement =
        document.getElementById("confirmPassword");

    const confirmPassword = confirmPasswordElement
        ? confirmPasswordElement.value
        : "";

    // Validation
    if (!name || !email || !password || !confirmPassword) {

        alert("Please fill in all fields.");
        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");
        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    // Check existing account
    const existingUser = getRegisteredUser();

    if (existingUser && existingUser.email === email) {

        alert("An account with this email already exists. Please login.");

        window.location.href = "login.html";
        return;

    }

    // Save new account
    saveUserDetails(name, email, password);

    // Do not automatically log in
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInEmail");

    alert("Registration successful! Please login.");

    window.location.href = "login.html";

}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", loginUser);

}


function loginUser(event) {

    event.preventDefault();

    // Get login values
    const email = document.getElementById("loginEmail")
        .value.trim().toLowerCase();

    const password = document.getElementById("loginPassword").value;

    // Get saved account
    const savedUser = getRegisteredUser();

    if (!email || !password) {

        alert("Please enter your email and password.");
        return;

    }

    // Account not found
    if (!savedUser) {

        alert("Account not found. Please create an account first.");
        return;

    }

    // Verify email and password
    if (
        email !== savedUser.email ||
        password !== savedUser.password
    ) {

        alert("Invalid email or password.");
        return;

    }

    // Login successful
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInEmail", savedUser.email);

    // Sync profile details
    localStorage.setItem(
        "investmentUser",
        JSON.stringify({
            name: savedUser.name,
            email: savedUser.email
        })
    );

    // Redirect to requested page if available
    const returnPage = localStorage.getItem("returnPage");

    if (returnPage) {

        localStorage.removeItem("returnPage");
        window.location.href = returnPage;

    } else {

        window.location.href = "index.html";

    }

}


// ========================================
// LOGOUT
// ========================================

function logoutUser() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInEmail");

    // Keep registered account details.
    // The user can log in again later.

    window.location.href = "login.html";

}
```