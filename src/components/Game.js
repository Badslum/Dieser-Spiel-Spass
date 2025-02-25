import Player from './Player.js';
import Collision from './Collision.js';
import Multiplayer from './Multiplayer.js';
import UI from './UI.js';
import Timer from './Timer.js';

class Game {
    constructor(canvas, context, socket) {
        this.canvas = canvas;
        this.context = context;
        this.socket = socket;
        this.players = [];
        this.timer = new Timer(300, this.endGame.bind(this)); // 5 Minuten
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.timer.start();
        this.loop();
    }

    loop() {
        if (!this.isRunning) return;
        this.update();
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update() {
        this.players.forEach(player => player.move());
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.players.forEach(player => player.draw(this.context));
    }

    addPlayer(player) {
        this.players.push(player);
    }

    endGame() {
        this.isRunning = false;
        UI.showGameOver();
    }
}

export default Game;