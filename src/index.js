// Importiere die Views
import Login from './views/Login.js';
import Register from './views/Register.js';
import Lobby from './views/Lobby.js';
import GameOver from './views/GameOver.js';
import Leaderboard from './views/Leaderboard.js';

// Initialisiere Socket.io
const socket = io();

// Hole den Haupt-Container
const app = document.getElementById('app');

// Zeige die passende View basierend auf der aktuellen URL
const path = window.location.pathname;

if (path === '/login') {
    const loginView = new Login(socket);
    app.innerHTML = loginView.render();
} else if (path === '/register') {
    const registerView = new Register(socket);
    app.innerHTML = registerView.render();
} else if (path === '/lobby') {
    const lobbyView = new Lobby(socket);
    app.innerHTML = lobbyView.render();
} else if (path === '/gameover') {
    const gameOverView = new GameOver();
    app.innerHTML = gameOverView.render();
} else if (path === '/leaderboard') {
    const leaderboardView = new Leaderboard(socket);
    app.innerHTML = leaderboardView.render();
} else {
    // Fallback: Zeige das Login-Formular
    window.location.href = '/login';
}