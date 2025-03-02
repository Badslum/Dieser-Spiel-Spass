// Importiere die Views
import Login from './views/Login.js';
import Register from './views/Register.js';
import Lobby from './views/Lobby.js';
import GameOver from './views/GameOver.js';
import Leaderboard from './views/Leaderboard.js';

// Importiere die Multiplayer-Kommunikation
import Multiplayer from './components/Multiplayer.js';

// Haupt-App-Klasse
class App {
    constructor() {
        // Erstelle die WebSocket-Verbindung
        this.socket = io();

        // Initialisiere die Multiplayer-Kommunikation
        this.multiplayer = new Multiplayer(this.socket);

        // Hole den Haupt-Container der Anwendung
        this.appContainer = document.getElementById('app');

        // Rufe die Methode auf, um die View basierend auf der URL zu rendern
        this.renderView();
    }

    // Methode zum Rendern der aktuellen View
    renderView() {
        const path = window.location.pathname;

        // Lade die entsprechende View basierend auf dem Pfad
        if (path === '/login') {
            const loginView = new Login(this.socket);
            this.appContainer.innerHTML = loginView.render();

        } else if (path === '/register') {
            const registerView = new Register(this.socket);
            this.appContainer.innerHTML = registerView.render();

        } else if (path === '/lobby') {
            const lobbyView = new Lobby(this.socket);
            this.appContainer.innerHTML = lobbyView.render();

        } else if (path === '/gameover') {
            const gameOverView = new GameOver();
            this.appContainer.innerHTML = gameOverView.render();

        } else if (path === '/leaderboard') {
            const leaderboardView = new Leaderboard(this.socket);
            this.appContainer.innerHTML = leaderboardView.render();

        } else {
            // Fallback: Weiterleitung zur Login-Seite
            window.location.href = '/login';
        }
    }
}

// Die App beim Laden der Seite initialisieren
document.addEventListener('DOMContentLoaded', () => {
    new App();
});