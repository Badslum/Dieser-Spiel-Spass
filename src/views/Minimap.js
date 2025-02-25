import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE, TEAM_COLORS } from '../utils/constants.js';

class Minimap {
    constructor(canvasId, game) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.game = game;

        // Größe der Minimap im Verhältnis zum Hauptspielfeld
        this.scale = 0.1;

        // Setze die Größe der Minimap
        this.canvas.width = CANVAS_WIDTH * this.scale;
        this.canvas.height = CANVAS_HEIGHT * this.scale;
    }

    // Methode zur Aktualisierung der Minimap
    update() {
        this.clear();
        this.drawGrid();
        this.drawTerritory();
        this.drawPlayers();
    }

    // Methode zum Löschen der Minimap
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Raster zeichnen
    drawGrid() {
        const rows = CANVAS_HEIGHT / GRID_SIZE;
        const cols = CANVAS_WIDTH / GRID_SIZE;

        this.context.strokeStyle = '#444';
        this.context.lineWidth = 0.5;

        for (let row = 0; row < rows; row++) {
            this.context.beginPath();
            this.context.moveTo(0, row * GRID_SIZE * this.scale);
            this.context.lineTo(this.canvas.width, row * GRID_SIZE * this.scale);
            this.context.stroke();
        }

        for (let col = 0; col < cols; col++) {
            this.context.beginPath();
            this.context.moveTo(col * GRID_SIZE * this.scale, 0);
            this.context.lineTo(col * GRID_SIZE * this.scale, this.canvas.height);
            this.context.stroke();
        }
    }

    // Territorium der Spieler zeichnen
    drawTerritory() {
        const grid = this.game.grid;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === 1) {
                    this.context.fillStyle = TEAM_COLORS.RED; // Rotes Team
                } else if (grid[row][col] === 2) {
                    this.context.fillStyle = TEAM_COLORS.BLUE; // Blaues Team
                } else {
                    continue; // Leeres Feld wird nicht gezeichnet
                }

                this.context.fillRect(
                    col * GRID_SIZE * this.scale,
                    row * GRID_SIZE * this.scale,
                    GRID_SIZE * this.scale,
                    GRID_SIZE * this.scale
                );
            }
        }
    }

    // Spielerpositionen zeichnen
    drawPlayers() {
        this.game.players.forEach(player => {
            this.context.fillStyle = player.color;
            this.context.fillRect(
                player.x * this.scale,
                player.y * this.scale,
                GRID_SIZE * this.scale,
                GRID_SIZE * this.scale
            );
        });
    }
}

export default Minimap;