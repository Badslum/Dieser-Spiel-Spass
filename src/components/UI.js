class UI {
    static updateScore(score) {
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    static updateTimer(time) {
        document.getElementById('timer').textContent = `Time: ${time}s`;
    }

    static showGameOver() {
        document.getElementById('game-over').style.display = 'block';
    }

    static hideGameOver() {
        document.getElementById('game-over').style.display = 'none';
    }
}

export default UI;