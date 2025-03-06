document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const guestModal = document.getElementById("guestModal");

    document.getElementById("loginBtn").addEventListener("click", () => {
        loginModal.style.display = "flex";
    });

    document.getElementById("guestBtn").addEventListener("click", () => {
        guestModal.style.display = "flex";
    });

    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            loginModal.style.display = "none";
            guestModal.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginModal) loginModal.style.display = "none";
        if (event.target === guestModal) guestModal.style.display = "none";
    });
});



// LOGIN VON JAKOB AUFRUFEN

document.getElementById("loginBtn").addEventListener("click", function () {
    window.open("login.html", "Login", "width=400,height=500");
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

