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

// Funktion zur Überprüfung der Eingabe
function validateInput(inputField, errorMessage) {
    let errorElement = inputField.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
    }

    if (inputField.value.trim() === '') {
        errorElement.textContent = errorMessage;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

// Validierung der Login-Eingaben
loginButton.addEventListener('click', function() {
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    if (validateInput(username, 'Bitte einen Benutzernamen eingeben.') &&
        validateInput(password, 'Bitte ein Passwort eingeben.')) {
        closeModals();
    }
});

// Validierung der Registrierung (leitet nach erfolgreicher Registrierung zum Login-Modal weiter)
registerButton.addEventListener('click', function() {
    const username = document.getElementById('register-username');
    const password = document.getElementById('register-password');

    if (validateInput(username, 'Bitte einen Benutzernamen eingeben.') &&
        validateInput(password, 'Bitte ein Passwort eingeben.')) {
        openModal(loginModal); // Öffnet direkt das Login-Modal
    }
});

// Validierung für Gast-Login
guestButton.addEventListener('click', function() {
    const username = document.getElementById('guest-username');

    if (validateInput(username, 'Bitte einen Benutzernamen eingeben.')) {
        closeModals();
    }
});

// Funktion zum Schließen der Modale und Anzeigen des "Join Game"-Buttons
function closeModals() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    guestModal.style.display = 'none';
    
    loginBtn.textContent = 'Join Game';
    loginBtn.style.display = 'block';

    loginBtn.onclick = () => window.location.href = '../game/game.html';
}

// Modal-Wechsel-Events
loginBtn.addEventListener('click', () => openModal(loginModal));
registerLink.addEventListener('click', () => openModal(registerModal));
guestLink.addEventListener('click', () => openModal(guestModal));
loginLink.addEventListener('click', () => openModal(loginModal));
guestLinkFromRegister.addEventListener('click', () => openModal(guestModal));
registerLinkFromGuest.addEventListener('click', () => openModal(registerModal));
loginLinkFromGuest.addEventListener('click', () => openModal(loginModal));


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