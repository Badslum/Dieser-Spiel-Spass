// === Globale Variablen ===
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const guestModal = document.getElementById('guestModal');
const accountIcon = document.getElementById('accountIcon');
const accountDropdown = document.getElementById('accountDropdown');

// Modal-Links
const registerLink = document.getElementById('registerLink');
const guestLink = document.getElementById('guestLink');
const loginLink = document.getElementById('loginLink');
const guestLinkFromRegister = document.getElementById('guestLinkFromRegister');
const registerLinkFromGuest = document.getElementById('registerLinkFromGuest');
const loginLinkFromGuest = document.getElementById('loginLinkFromGuest');

// Buttons
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const guestButton = document.getElementById('guest-button');

// === Modal-Funktionen ===
function openModal(modal) {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    guestModal.style.display = 'none';
    modal.style.display = 'flex';
    updateModalLinks();
}

function closeModals() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    guestModal.style.display = 'none';
}

function closeModalOnOutsideClick() {
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// === Validierungs-Funktionen ===
function validateInput(inputField, errorMessage) {
    let formGroup = inputField.parentNode;
    let passwordField = formGroup.querySelector('input[type="password"]') || inputField;
    let errorElement = passwordField.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        passwordField.parentNode.insertBefore(errorElement, passwordField.nextSibling);
    }

    if (inputField.value.trim() === '') {
        errorElement.textContent = errorMessage;
        return false;
    } else {
        if (errorElement.textContent === errorMessage) {
            errorElement.textContent = '';
        }
        return true;
    }
}

function validateUsername(usernameField) {
    const username = usernameField.value.trim();
    const usernamePattern = /^[a-zA-Z0-9]{1,10}$/;
    let errorElement = createErrorElement(usernameField);

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

function validatePassword(passwordField) {
    const password = passwordField.value.trim();
    let errorElement = createErrorElement(passwordField);

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

// === Cookie- und Session-Funktionen ===
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function isGuestNameTaken(username) {
    const storedGuestNames = getCookie('guestNames');
    if (storedGuestNames) {
        const guestList = JSON.parse(storedGuestNames);
        return guestList.includes(username);
    }
    return false;
}

function saveGuestName(username) {
    let guestList = [];
    const storedGuestNames = getCookie('guestNames');
    if (storedGuestNames) {
        guestList = JSON.parse(storedGuestNames);
    }
    guestList.push(username);
    setCookie('guestNames', JSON.stringify(guestList), 24);
}

// === Button- und Dropdown-Funktionen ===
function updateJoinButton() {
    const guestUser = sessionStorage.getItem('guestUser');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (guestUser || loggedInUser) {
        loginBtn.textContent = 'Join Game';
        loginBtn.style.display = 'block';
        loginBtn.onclick = () => window.location.href = '../game/game.html';
    } else {
        loginBtn.textContent = 'Login / Register';
        loginBtn.style.display = 'block';
        loginBtn.onclick = () => openModal(loginModal);
    }
}

function updateAccountDropdown() {
    const guestUser = sessionStorage.getItem('guestUser');
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const guestLoginOptions = document.getElementById("guestLoginOptions");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (guestUser || loggedInUser) {
        usernameDisplay.textContent = guestUser || loggedInUser;
        guestLoginOptions.style.display = "block";
    } else {
        usernameDisplay.textContent = "Benutzer";
        guestLoginOptions.style.display = "none";
    }
}

function updateModalLinks() {
    const guestUser = sessionStorage.getItem('guestUser');
    const loginAlternativeText = loginModal.querySelector('#alternative-text');
    const registerAlternativeText = registerModal.querySelector('#alternative-text');

    if (guestUser) {
        loginAlternativeText.innerHTML = 
            `<a href="#" id="registerLink">Registrieren</a>`;
        registerAlternativeText.innerHTML = 
            `<a href="#" id="loginLink">Einloggen</a>`;

        loginModal.querySelector('#registerLink').addEventListener('click', () => openModal(registerModal));
        registerModal.querySelector('#loginLink').addEventListener('click', () => openModal(loginModal));
    } else {
        loginAlternativeText.innerHTML = 
            `<a href="#" id="registerLink">Registrieren</a> oder ` +
            `<a href="#" id="guestLink">als Gast fortfahren</a>`;
        registerAlternativeText.innerHTML = 
            `<a href="#" id="loginLink">Einloggen</a> oder ` +
            `<a href="#" id="guestLinkFromRegister">als Gast fortfahren</a>`;

        loginModal.querySelector('#registerLink').addEventListener('click', () => openModal(registerModal));
        loginModal.querySelector('#guestLink').addEventListener('click', () => openModal(guestModal));
        registerModal.querySelector('#loginLink').addEventListener('click', () => openModal(loginModal));
        registerModal.querySelector('#guestLinkFromRegister').addEventListener('click', () => openModal(guestModal));
    }
}

// === Event-Listener ===
// Seite geladen
document.addEventListener("DOMContentLoaded", function() {
    updateJoinButton();
    updateAccountDropdown();
    closeModalOnOutsideClick();
    updateModalLinks();
});

// Login-Handler
loginButton.addEventListener('click', function() {
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    let valid = true;
    if (!validateInput(username, 'Bitte einen Benutzernamen eingeben.')) valid = false;
    if (!validateInput(password, 'Bitte ein Passwort eingeben.')) valid = false;

    if (valid) {
        sessionStorage.setItem('loggedInUser', username.value);
        closeModals();
        updateJoinButton();
        updateAccountDropdown();
        updateModalLinks();
    }
});

// Registrierungs-Handler
registerButton.addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username');
    const password = document.getElementById('register-password');

    let isUsernameValid = validateUsername(username);
    let isPasswordValid = validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
        openModal(loginModal);
    }
});

// Gast-Login-Handler
guestButton.addEventListener('click', function() {
    const usernameField = document.getElementById('guest-username');
    const username = usernameField.value.trim();
    let errorElement = createErrorElement(usernameField);

    if (!validateInput(usernameField, 'Bitte einen Benutzernamen eingeben.')) {
        return;
    }

    if (isGuestNameTaken(username)) {
        errorElement.textContent = 'Dieser Benutzername ist bereits vergeben.';
    } else {
        errorElement.textContent = '';
        saveGuestName(username);
        sessionStorage.setItem('guestUser', username);
        updateJoinButton();
        updateAccountDropdown();
        updateModalLinks();
        closeModals();
    }
});

// Modal-Wechsel
loginBtn.addEventListener('click', () => openModal(loginModal));
registerLink.addEventListener('click', () => openModal(registerModal));
guestLink.addEventListener('click', () => {
    if (!sessionStorage.getItem('guestUser')) openModal(guestModal);
});
loginLink.addEventListener('click', () => openModal(loginModal));
guestLinkFromRegister.addEventListener('click', () => {
    if (!sessionStorage.getItem('guestUser')) openModal(guestModal);
});
registerLinkFromGuest.addEventListener('click', () => openModal(registerModal));
loginLinkFromGuest.addEventListener('click', () => openModal(loginModal));

// Account-Dropdown
accountIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    updateAccountDropdown();
    accountDropdown.style.display = accountDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
    if (!accountIcon.contains(event.target) && !accountDropdown.contains(event.target)) {
        accountDropdown.style.display = "none";
    }
});

document.getElementById("dropdownLogin").addEventListener("click", function(event) {
    event.preventDefault();
    openModal(loginModal);
});





<<<<<<< HEAD
<<<<<<< HEAD
/* SNAKE ANIMATION
=======
<<<<<<< HEAD
/* SNAKE ANIMATION
=======
<<<<<<< HEAD
// SNAKE ANIMATION
=======
/* SNAKE ANIMATION
>>>>>>> 7364c673941bffa42d8739797e5389767cb23011
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> backend
=======






// SNAKE ANIMATION
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

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
        this.angle += (Math.random() - 0.5) * 0.2; // Leichte Richtungsänderungen
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.path.push({ x: this.x, y: this.y });

        if (this.path.length > this.maxLength) {
            this.path.shift();
        }
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

<<<<<<< HEAD
animate();
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> backend
 */

// MAUSZEIGER Snake Animation

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 🐍 Klasse für die Schlangen
class Snake {
    constructor(color) {
        this.path = [];
        this.maxLength = 50;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = color;
        this.active = true;
    }

    move() {
        if (!this.active) return;
        this.angle += (Math.random() - 0.5) * 0.2;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.path.push({ x: this.x, y: this.y });

        if (this.path.length > this.maxLength) {
            this.path.shift();
        }
    }

    draw() {
        if (!this.active) return;
        for (let i = 0; i < this.path.length; i++) {
            const opacity = i / this.path.length;
            ctx.fillStyle = this.color.replace("X", opacity);
            ctx.beginPath();
            ctx.arc(this.path[i].x, this.path[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// 🎨 Blaue & Rote Schlangen erzeugen
const snakes = [];
for (let i = 0; i < 10; i++) {
    const color = i % 2 === 0 ? "rgba(0, 204, 255, X)" : "rgba(255, 50, 50, X)";
    snakes.push(new Snake(color));
}

// 🖱 Spieler-Schlange (Maus-gesteuert)
const playerSnake = new Snake(Math.random() > 0.5 ? "rgba(0, 204, 255, X)" : "rgba(255, 50, 50, X)");
playerSnake.maxLength = 80;
let lastMouseMove = Date.now();
let isMoving = false;
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;

// 🎮 Mausbewegung steuert die Spieler-Schlange
window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    lastMouseMove = Date.now();
    isMoving = true;
});

// 🎯 Interpolation für weiche Bewegung
function updatePlayerSnake() {
    const lerpFactor = 0.1; // Sanfte Bewegung zur Mausposition
    playerSnake.x += (targetX - playerSnake.x) * lerpFactor;
    playerSnake.y += (targetY - playerSnake.y) * lerpFactor;

    playerSnake.path.push({ x: playerSnake.x, y: playerSnake.y });

    if (playerSnake.path.length > playerSnake.maxLength) {
        playerSnake.path.shift();
    }

    // Überprüfen, ob die Maus inaktiv ist (nach 2 Sekunden)
    if (Date.now() - lastMouseMove > 2000) {
        isMoving = false;
    }

    // Falls inaktiv, langsam den Schweif ausblenden
    if (!isMoving && playerSnake.path.length > 0) {
        playerSnake.path.shift(); // Löscht langsam den Schweif
    }
}

// ✨ Buttons deaktivieren die Spieler-Schlange beim Hover
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        playerSnake.active = false;
    });
    button.addEventListener("mouseleave", () => {
        playerSnake.active = true;
    });
});

// 🏃 Hauptanimations-Loop
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Hintergrund leicht transparent halten

    snakes.forEach(snake => {
        snake.move();
        snake.draw();
    });

    updatePlayerSnake(); // Bewegung aktualisieren
    playerSnake.draw(); // Spieler-Schlange zeichnen

    requestAnimationFrame(animate);
}

animate();
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 7364c673941bffa42d8739797e5389767cb23011
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> backend
=======
animate();
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
