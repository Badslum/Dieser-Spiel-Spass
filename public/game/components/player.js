import { movePlayer } from "../movement.js";

export class Player {
    constructor(x, y, color, grid) {
        this.grid = grid;
        this.color = color || "blue"; // **Fix: Standardfarbe setzen, falls undefined**
        this.trail = [];
        this.tempTrail = [];
        this.direction = "right";
        this.moveTime = performance.now();
        this.speed = 90;
        this.isMoving = false;
        this.gridSize = 15;
        this.alive = true;

        this.spawnPlayer(); // **Spieler spawnt zu Beginn**

        window.addEventListener("keydown", (event) => this.handleInput(event));
    }

    spawnPlayer() {
        const centerX = Math.floor(this.grid[0].length / 2);
        const centerY = Math.floor(this.grid.length / 2);

        this.x = centerX;
        this.y = centerY;
        this.trail = [];

        // **Sicherstellen, dass das Spielfeld geleert wird**
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x] = 0; // **Alles zurücksetzen**
            }
        }

        // **3x3 Startfläche einfärben**
        for (let y = centerY - 1; y <= centerY + 1; y++) {
            for (let x = centerX - 1; x <= centerX + 1; x++) {
                if (y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length) {
                    this.grid[y][x] = 1; // **Fix: Stelle sicher, dass das Grid aktualisiert wird**
                }
            }
        }
    }

    handleInput(event) {
        if (!this.alive || this.isMoving) return; // **Blockiert Eingabe nach Tod oder während Bewegung**

        let newDirection = this.direction;

        switch (event.key) {
            case "ArrowUp":
                if (this.direction !== "down") newDirection = "up";
                break;
            case "ArrowDown":
                if (this.direction !== "up") newDirection = "down";
                break;
            case "ArrowLeft":
                if (this.direction !== "right") newDirection = "left";
                break;
            case "ArrowRight":
                if (this.direction !== "left") newDirection = "right";
                break;
        }

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.isMoving = false; // **Fix: Blockierung aufheben, damit neue Eingaben möglich sind**
        }
    }

    update(timestamp) {
        if (!this.alive) return;
    
        const deltaTime = timestamp - this.moveTime;
        if (deltaTime < this.speed) return;
    
        this.prevX = this.x;
        this.prevY = this.y;
        this.moveTime = timestamp;
    
        const result = movePlayer(this);
    
        if (result === "capture") {
            this.trail.push(...this.tempTrail);
            this.tempTrail = [];
        } else if (result === "trail") {
            this.tempTrail.push({ x: this.prevX, y: this.prevY }); // **Speichert vorheriges Feld**
        }
    }
    
    draw(ctx, timestamp) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        const progress = Math.min(1, (timestamp - this.moveTime) / this.speed);
        const renderX = this.prevX * this.gridSize + (this.x - this.prevX) * this.gridSize * progress;
        const renderY = this.prevY * this.gridSize + (this.y - this.prevY) * this.gridSize * progress;
    
        // **Spielfeld Raster zeichnen**
        ctx.strokeStyle = "lightgray";
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 1) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
                }
                ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }
    
        // **Fix: Spur erst übernehmen, wenn Bewegung vollständig abgeschlossen ist**
        if (progress === 1 && this.tempTrail.length > 0) {
            this.trail.push(...this.tempTrail);
            this.tempTrail = [];
        }
    
        // **Spur zeichnen (nachdem progress === 1 erreicht wurde)**
        ctx.fillStyle = "rgba(255, 100, 100, 0.5)";
        for (let pos of this.trail) {
            ctx.fillRect(pos.x * this.gridSize, pos.y * this.gridSize, this.gridSize, this.gridSize);
        }
    
        // **Fix: Spieler als volle Farbe zeichnen**
        ctx.fillStyle = "red";
        ctx.fillRect(renderX, renderY, this.gridSize, this.gridSize);
    
        // **Schwarzer Punkt für den Kopf**
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(
            renderX + this.gridSize / 2,
            renderY + this.gridSize / 2,
            this.gridSize / 4,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    
    
    
    
    
    
}


