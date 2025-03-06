import { Player } from "./player.js";
import { drawGrid } from "./map.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// **Neue Rastergröße**
const gridSize = 15;
const cols = Math.floor(600 / gridSize);
const rows = Math.floor(400 / gridSize);

// **Canvas-Größe basierend auf Raster**
canvas.width = cols * gridSize;
canvas.height = rows * gridSize;

// **Initialisiere das Raster mit Nullwerten**
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

// **Spieler spawnt auf einem 3x3 Feld**
for (let i = 4; i < 7; i++) {
    for (let j = 4; j < 7; j++) {
        grid[i][j] = 1;
    }
}

// **Spieler-Objekt initialisieren**
const player = new Player(5, 5, "red", grid);

const moveInterval = 120;

function gameLoop(timestamp) {
    if (!lastRenderTime) lastRenderTime = timestamp;
    const deltaTime = timestamp - lastRenderTime;

    if (deltaTime >= player.speed) {
        player.update(timestamp); // **Fix: Spielerposition zuerst aktualisieren**
        lastRenderTime = timestamp;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas, grid);
    player.draw(ctx, timestamp); // **Fix: Spieler erst nach Update zeichnen**

    requestAnimationFrame(gameLoop);
}

let lastRenderTime = 0;
requestAnimationFrame(gameLoop);


requestAnimationFrame(gameLoop);

