// SNAKE ANIMATION
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Snake {
        constructor(color) {
            this.path = [];
            this.maxLength = 50;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.color = color;
        }

        move() {
            this.angle += (Math.random() - 0.5) * 0.2;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            this.path.push({ x: this.x, y: this.y });
            if (this.path.length > this.maxLength) this.path.shift();
        }

        draw() {
            for (let i = 0; i < this.path.length; i++) {
                const opacity = i / this.path.length;
                ctx.fillStyle = this.color.replace("X", opacity);
                ctx.beginPath();
                ctx.arc(this.path[i].x, this.path[i].y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    const snakes = [];
    for (let i = 0; i < 10; i++) {
        const color = i % 2 === 0 ? "rgba(0, 204, 255, X)" : "rgba(255, 50, 50, X)";
        snakes.push(new Snake(color));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snakes.forEach((snake) => {
            snake.move();
            snake.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// LOGIN / REGISTRIERUNG / GAST LOGIK
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const guestModal = document.getElementById("guestModal");
const changePasswordModal = document.getElementById("changePasswordModal");
const accountIcon = document.getElementById("accountIcon");
const accountDropdown = document.getElementById("accountDropdown");
const usernameDisplay = document.getElementById("usernameDisplay");
const guestLoginOptions = document.getElementById("guestLoginOptions");
const loggedInOptions = document.getElementById("loggedInOptions");
const themeToggle = document.getElementById("themeToggle");
const backIcon = document.getElementById("backIcon");

// Modal-Links
const registerLink = document.getElementById("registerLink");
const guestLink = document.getElementById("guestLink");
const loginLink = document.getElementById("loginLink");
const guestLinkFromRegister = document.getElementById("guestLinkFromRegister");
const registerLinkFromGuest = document.getElementById("registerLinkFromGuest");
const loginLinkFromGuest = document.getElementById("loginLinkFromGuest");
const backToLoginFromChange = document.getElementById("backToLoginFromChange");

// Dropdown-Links
const dropdownLogin = document.getElementById("dropdownLogin");
const dropdownRegister = document.getElementById("dropdownRegister");
const changePassword = document.getElementById("changePassword");
const logout = document.getElementById("logout");

// Buttons in Modalen
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const guestButton = document.getElementById("guest-button");
const changePasswordButton = document.getElementById("change-password-button");

// Benutzerdaten
let currentUser = localStorage.getItem("currentUser") || null;
let isGuest = localStorage.getItem("isGuest") === "true" || false;

// Theme-Logik
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    if (accountIcon) {
        accountIcon.src = theme === "dark" ? "account_icon_white.png" : "account_icon_black.png";
    }
    if (backIcon) {
        backIcon.src = theme === "dark" ? "back_white.png" : "back_black.png";
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
}

// Initiales Theme setzen beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? "dark" : "light");
    }

    // Theme Toggle Event
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
});

// Validierungs-Funktionen
function validateUsername(usernameField, errorDisplayField) {
    const username = usernameField.value.trim();
    const usernamePattern = /^[a-zA-Z0-9]{1,10}$/;
    resetErrorMessages(errorDisplayField.parentNode);
    let errorElement = createErrorElement(errorDisplayField);

    if (username === "") {
        errorElement.textContent = "Bitte einen Benutzernamen eingeben.";
        return false;
    } else if (!usernamePattern.test(username)) {
        errorElement.textContent = "Max. 10 Zeichen, keine Sonderzeichen erlaubt!";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}

function validatePassword(passwordField, errorDisplayField) {
    const password = passwordField.value.trim();
    resetErrorMessages(errorDisplayField.parentNode);
    let errorElement = createErrorElement(errorDisplayField);

    if (password === "") {
        errorElement.textContent = "Bitte ein Passwort eingeben.";
        return false;
    } else if (password.length < 5) {
        errorElement.textContent = "Passwort muss mindestens 5 Zeichen lang sein!";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}

function validatePasswordMatch(newPasswordField, confirmPasswordField) {
    const newPassword = newPasswordField.value.trim();
    const confirmPassword = confirmPasswordField.value.trim();
    resetErrorMessages(confirmPasswordField.parentNode);
    let errorElement = createErrorElement(confirmPasswordField);

    if (newPassword !== confirmPassword) {
        errorElement.textContent = "Die Passwörter stimmen nicht überein!";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}

function createErrorElement(field) {
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    return errorElement;
}

function resetErrorMessages(container) {
    const errorElements = container.querySelectorAll('.error-message');
    errorElements.forEach((element) => {
        element.textContent = "";
    });
}

// Modal öffnen/schließen
function openModal(modal) {
    modal.style.display = "flex";
    resetErrorMessages(modal);
}

function closeModal(modal) {
    modal.style.display = "none";
    resetErrorMessages(modal);
}

// Initialer UI-Status laden
if (currentUser && loginBtn && usernameDisplay && guestLoginOptions && loggedInOptions) {
    updateUIAfterLogin();
}

// Haupt-Login-Button
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        if (loginBtn.textContent === "Join Game") {
            window.location.href = "../game/game.html";
        } else {
            openModal(loginModal);
        }
    });
}

// Modal-Wechsel
if (registerLink) {
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
}

if (guestLink) {
    guestLink.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(guestModal);
    });
}

if (loginLink) {
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
}

if (guestLinkFromRegister) {
    guestLinkFromRegister.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(guestModal);
    });
}

if (registerLinkFromGuest) {
    registerLinkFromGuest.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(guestModal);
        openModal(registerModal);
    });
}

if (loginLinkFromGuest) {
    loginLinkFromGuest.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(guestModal);
        openModal(loginModal);
    });
}

if (backToLoginFromChange) {
    backToLoginFromChange.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(changePasswordModal);
        openModal(loginModal);
    });
}

// Account-Dropdown ein-/ausblenden
if (accountIcon && accountDropdown) {
    accountIcon.addEventListener("click", () => {
        accountDropdown.style.display = accountDropdown.style.display === "block" ? "none" : "block";
    });
}

// Registrierung
if (registerButton) {
    registerButton.addEventListener("click", () => {
        const usernameField = document.getElementById("register-username");
        const passwordField = document.getElementById("register-password");
        if (validateUsername(usernameField, passwordField) && validatePassword(passwordField, passwordField)) {
            currentUser = usernameField.value;
            isGuest = false;
            localStorage.setItem("currentUser", currentUser);
            localStorage.setItem("isGuest", "false");
            alert("Registrierung erfolgreich! Bitte logge dich ein.");
            closeModal(registerModal);
            openModal(loginModal);
        }
    });
}

// Login
if (loginButton) {
    loginButton.addEventListener("click", () => {
        const usernameField = document.getElementById("login-username");
        const passwordField = document.getElementById("login-password");
        if (validateUsername(usernameField, passwordField) && validatePassword(passwordField, passwordField)) {
            currentUser = usernameField.value;
            isGuest = false;
            localStorage.setItem("currentUser", currentUser);
            localStorage.setItem("isGuest", "false");
            updateUIAfterLogin();
            closeModal(loginModal);
        }
    });
}

// Gast-Login
if (guestButton) {
    guestButton.addEventListener("click", () => {
        const usernameField = document.getElementById("guest-username");
        if (validateUsername(usernameField, usernameField)) {
            currentUser = usernameField.value;
            isGuest = true;
            localStorage.setItem("currentUser", currentUser);
            localStorage.setItem("isGuest", "true");
            updateUIAfterLogin();
            closeModal(guestModal);
        }
    });
}

// Passwort ändern
if (changePasswordButton) {
    changePasswordButton.addEventListener("click", () => {
        const newPasswordField = document.getElementById("new-password");
        const confirmNewPasswordField = document.getElementById("confirm-new-password");
        if (
            validatePassword(newPasswordField, confirmNewPasswordField) &&
            validatePasswordMatch(newPasswordField, confirmNewPasswordField)
        ) {
            alert("Passwort erfolgreich geändert!");
            closeModal(changePasswordModal);
        }
    });
}

// UI nach Login aktualisieren
function updateUIAfterLogin() {
    loginBtn.textContent = "Join Game";
    usernameDisplay.textContent = currentUser;
    if (isGuest) {
        guestLoginOptions.style.display = "block";
        loggedInOptions.style.display = "none";
    } else {
        guestLoginOptions.style.display = "none";
        loggedInOptions.style.display = "block";
    }
}

// Dropdown-Links
if (dropdownLogin) {
    dropdownLogin.addEventListener("click", (e) => {
        e.preventDefault();
        accountDropdown.style.display = "none";
        openModal(loginModal);
    });
}

if (dropdownRegister) {
    dropdownRegister.addEventListener("click", (e) => {
        e.preventDefault();
        accountDropdown.style.display = "none";
        openModal(registerModal);
    });
}

if (changePassword) {
    changePassword.addEventListener("click", (e) => {
        e.preventDefault();
        accountDropdown.style.display = "none";
        openModal(changePasswordModal);
    });
}

if (logout) {
    logout.addEventListener("click", (e) => {
        e.preventDefault();
        currentUser = null;
        isGuest = false;
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isGuest");
        loginBtn.textContent = "Einloggen / Registrieren";
        usernameDisplay.textContent = "Account";
        guestLoginOptions.style.display = "none";
        loggedInOptions.style.display = "none";
        accountDropdown.style.display = "none";
    });
}

// Modale schließen, wenn außerhalb geklickt wird
window.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === registerModal) closeModal(registerModal);
    if (e.target === guestModal) closeModal(guestModal);
    if (e.target === changePasswordModal) closeModal(changePasswordModal);
});