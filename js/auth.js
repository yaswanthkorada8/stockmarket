// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        registerUser
    );

}


function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "registerName"
        )
        .value
        .trim();


    const email =
        document.getElementById(
            "registerEmail"
        )
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "registerPassword"
        )
        .value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        )
        .value;


    // ========================================
    // VALIDATION
    // ========================================

    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;
    }


    if (email === "") {

        alert(
            "Please enter your email."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }


    if (
        password !==
        confirmPassword
    ) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    // ========================================
    // CHECK EXISTING USER
    // ========================================

    const existingEmail =
        localStorage.getItem(
            "userEmail"
        );


    if (
        existingEmail &&
        existingEmail.toLowerCase() ===
        email
    ) {

        alert(
            "An account with this email already exists."
        );

        window.location.href =
            "login.html";

        return;
    }


    // ========================================
    // SAVE USER
    // ========================================

    localStorage.setItem(
        "userName",
        name
    );


    localStorage.setItem(
        "userEmail",
        email
    );


    localStorage.setItem(
        "userPassword",
        password
    );


    // User is not logged in after registration

    localStorage.removeItem(
        "isLoggedIn"
    );


    localStorage.removeItem(
        "loggedInEmail"
    );


    alert(
        "Registration successful!"
    );


    window.location.href =
        "login.html";
}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        loginUser
    );

}


function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        )
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "loginPassword"
        )
        .value;


    // ========================================
    // GET REGISTERED USER
    // ========================================

    const savedEmail =
        localStorage.getItem(
            "userEmail"
        );


    const savedPassword =
        localStorage.getItem(
            "userPassword"
        );


    const savedName =
        localStorage.getItem(
            "userName"
        );


    // ========================================
    // CHECK USER
    // ========================================

    if (
        !savedEmail ||
        !savedPassword
    ) {

        alert(
            "No registered account found. Please register first."
        );

        return;
    }


    if (
        email !==
        savedEmail.toLowerCase()
    ) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    if (
        password !==
        savedPassword
    ) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    // ========================================
    // LOGIN SUCCESS
    // ========================================

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );


    localStorage.setItem(
        "loggedInEmail",
        email
    );


    localStorage.setItem(
        "userName",
        savedName || ""
    );


    // ========================================
    // REDIRECT
    // ========================================

    const returnPage =
        localStorage.getItem(
            "returnPage"
        );


    if (returnPage) {

        localStorage.removeItem(
            "returnPage"
        );


        window.location.href =
            returnPage;

    } else {

        window.location.href =
            "index.html";
    }
}