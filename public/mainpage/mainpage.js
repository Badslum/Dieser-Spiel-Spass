const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const guestModal = document.getElementById('guestModal');

const registerLink = document.getElementById('registerLink');
const guestLink = document.getElementById('guestLink');
const loginLink = document.getElementById('loginLink');
const guestLinkFromRegister = document.getElementById('guestLinkFromRegister');
const registerLinkFromGuest = document.getElementById('registerLinkFromGuest');
const loginLinkFromGuest = document.getElementById('loginLinkFromGuest');

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const guestButton = document.getElementById('guest-button');

function openModal(modal) {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    guestModal.style.display = 'none';
    modal.style.display = 'flex';
}

// Funktion zur Überprüfung der Eingabe und Anzeige der Fehlermeldung
function validateInput(inputField, errorMessage) {
    let formGroup = inputField.parentNode; // Der direkte Container des Eingabefelds
    let passwordField = formGroup.querySelector('input[type="password"]'); // Passwortfeld im gleichen Container suchen

    if (!passwordField) {
        passwordField = inputField; // Falls kein Passwortfeld existiert (z.B. Gast-Login)
    }

    let errorElement = passwordField.nextElementSibling;

    // Falls die Fehlermeldung noch nicht existiert oder an falscher Stelle ist, neu erstellen
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';

        passwordField.parentNode.insertBefore(errorElement, passwordField.nextSibling);
    }

    // Fehler setzen oder entfernen
    if (inputField.value.trim() === '') {
        errorElement.textContent = errorMessage;
        return false;
    } else {
        if (errorElement.textContent === errorMessage) {
            errorElement.textContent = ''; // Entfernt nur die spezifische Fehlermeldung
        }
        return true;
    }
}

// Funktion zum Setzen eines Cookies (Speicherung für 24 Stunden)
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Funktion zum Abrufen eines Cookies
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

// Funktion zum Überprüfen, ob ein Gastname bereits vergeben ist
function isGuestNameTaken(username) {
    const storedGuestNames = getCookie('guestNames');
    if (storedGuestNames) {
        const guestList = JSON.parse(storedGuestNames);
        return guestList.includes(username);
    }
    return false;
}

// Funktion zum Speichern eines neuen Gastnamens in den Cookies
function saveGuestName(username) {
    let guestList = [];

    const storedGuestNames = getCookie('guestNames');
    if (storedGuestNames) {
        guestList = JSON.parse(storedGuestNames);
    }

    guestList.push(username);
    setCookie('guestNames', JSON.stringify(guestList), 24);
}

// Funktion zum Aktualisieren des "Join Game"-Buttons basierend auf Session Storage
function updateJoinButton() {
    const guestUser = sessionStorage.getItem('guestUser');

    if (guestUser) {
        loginBtn.textContent = 'Join Game';
        loginBtn.style.display = 'block';
        loginBtn.onclick = () => window.location.href = '../game/game.html';
    } else {
        loginBtn.textContent = 'Login / Register';
        loginBtn.style.display = 'block';
        loginBtn.onclick = () => openModal(loginModal);
    }
}

// Beim Laden der Seite prüfen, ob ein Gast eingeloggt ist
document.addEventListener("DOMContentLoaded", function() {
    updateJoinButton();
});

// Login-Validierung
loginButton.addEventListener('click', function() {
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    let valid = true;
    if (!validateInput(username, 'Bitte einen Benutzernamen eingeben.')) valid = false;
    if (!validateInput(password, 'Bitte ein Passwort eingeben.')) valid = false;

    if (valid) closeModals();
});

// Funktion zur Überprüfung des Usernames (Max. 10 Zeichen, keine Sonderzeichen)
function validateUsername(usernameField) {
    const username = usernameField.value.trim();
    const usernamePattern = /^[a-zA-Z0-9]{1,10}$/; // Nur Buchstaben & Zahlen, max. 10 Zeichen
    let errorElement = usernameField.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        usernameField.parentNode.insertBefore(errorElement, usernameField.nextSibling);
    }

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

// Funktion zur Überprüfung des Passworts (Min. 5 Zeichen)
function validatePassword(passwordField) {
    const password = passwordField.value.trim();
    let errorElement = passwordField.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        passwordField.parentNode.insertBefore(errorElement, passwordField.nextSibling);
    }

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

// Registrierung-Validierung mit vollständiger Fehlerbehandlung
registerButton.addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten

    const username = document.getElementById('register-username');
    const password = document.getElementById('register-password');

    let isUsernameValid = validateUsername(username);
    let isPasswordValid = validatePassword(password);

    // Login-Modal NUR öffnen, wenn beide Eingaben gültig sind
    if (isUsernameValid && isPasswordValid) {
        openModal(loginModal); // Öffnet das Login-Modal nur, wenn keine Fehler
    }
});



// Validierung für Gast-Login mit Überprüfung auf doppelte Usernames
guestButton.addEventListener('click', function() {
    const usernameField = document.getElementById('guest-username');
    const username = usernameField.value.trim();
    
    let errorElement = usernameField.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        usernameField.parentNode.insertBefore(errorElement, usernameField.nextSibling);
    }

    if (!validateInput(usernameField, 'Bitte einen Benutzernamen eingeben.')) {
        return;
    }

    if (isGuestNameTaken(username)) {
        errorElement.textContent = 'Dieser Benutzername ist bereits vergeben. Bitte wähle einen anderen.';
    } else {
        errorElement.textContent = ''; // Fehler entfernen
        saveGuestName(username);
        sessionStorage.setItem('guestUser', username); // Speichert Gast-Login in Session
        updateJoinButton(); // Aktualisiert den Button-Status
        closeModals();
    }
});

// Funktion zum Schließen der Modale
function closeModals() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    guestModal.style.display = 'none';

    updateJoinButton();
}

// Modal-Wechsel-Events
loginBtn.addEventListener('click', () => openModal(loginModal));
registerLink.addEventListener('click', () => openModal(registerModal));
guestLink.addEventListener('click', () => openModal(guestModal));
loginLink.addEventListener('click', () => openModal(loginModal));
guestLinkFromRegister.addEventListener('click', () => openModal(guestModal));
registerLinkFromGuest.addEventListener('click', () => openModal(registerModal));
loginLinkFromGuest.addEventListener('click', () => openModal(loginModal));

// Funktion zum Schließen des Modals, wenn außerhalb geklickt wird
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

// Funktion aufrufen, um das Verhalten zu aktivieren
closeModalOnOutsideClick();




// Account Dropdown

// Funktion zur Aktualisierung des Account-Dropdowns für Gäste
function updateAccountDropdown() {
    const guestUser = sessionStorage.getItem('guestUser'); // Überprüfung auf Gastbenutzer
    const guestLoginOptions = document.getElementById("guestLoginOptions");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (guestUser) {
        usernameDisplay.textContent = guestUser; // Gast-Name anzeigen
        guestLoginOptions.style.display = "block"; // "Einloggen / Registrieren" anzeigen
    } else {
        usernameDisplay.textContent = "Benutzer"; // Standardname
        guestLoginOptions.style.display = "none"; // Verstecken, wenn kein Gast
    }
}

// Beim Laden der Seite das Account-Dropdown einmal aktualisieren
document.addEventListener("DOMContentLoaded", function() {
    updateAccountDropdown();
});

// Dropdown Toggle für das Account-Icon
accountIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    
    // Vor dem Umschalten aktualisieren, aber das Dropdown nicht beeinflussen
    updateAccountDropdown();

    // Öffne oder schließe das Dropdown normal
    accountDropdown.style.display = accountDropdown.style.display === "block" ? "none" : "block";
});

// Schließt das Dropdown, wenn außerhalb geklickt wird
document.addEventListener("click", (event) => {
    if (!accountIcon.contains(event.target) && !accountDropdown.contains(event.target)) {
        accountDropdown.style.display = "none";
    }
});

// Funktion zum Öffnen des Login-Modals beim Klick auf "Einloggen / Registrieren"
document.getElementById("dropdownLogin").addEventListener("click", function(event) {
    event.preventDefault();
    openModal(loginModal); // Öffne das Login-Modal
});

// Passwort ändern Modal öffnen über Account-Icon
changePassword.addEventListener("click", (event) => {
    event.preventDefault();
    passwordModal.style.display = "flex";
    accountDropdown.style.display = "none";
});

// Passwort ändern Modal öffnen über "Passwort vergessen?"
forgotPassword.addEventListener("click", (event) => {
    event.preventDefault();
    passwordModal.style.display = "flex";
});

// Passwort speichern
savePassword.addEventListener("click", () => {
    if (newPassword.value === confirmPassword.value && newPassword.value !== "") {
        alert("Passwort wurde geändert!");
        passwordModal.style.display = "none";
        newPassword.value = "";
        confirmPassword.value = "";
    } else {
        alert("Passwörter stimmen nicht überein!");
    }
});











// SNAKE ANIMATION

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

animate();