class GameOver {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('play-again').addEventListener('click', () => {
            window.location.href = '/lobby';
        });

        document.getElementById('view-leaderboard').addEventListener('click', () => {
            window.location.href = '/leaderboard';
        });
    }

    render(winnerTeam, scores) {
        const scoresHtml = scores.map(score => `<li>${score.username}: ${score.points} points</li>`).join('');

        return `
            <div class="game-over-container">
                <h2>Game Over</h2>
                <h3>${winnerTeam} Team Wins!</h3>
                <ul>${scoresHtml}</ul>
                <button id="play-again">Play Again</button>
                <button id="view-leaderboard">View Leaderboard</button>
            </div>
        `;
    }
}

export default GameOver;