// Spielfeldkonfiguration
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const GRID_SIZE = 10;

// Geschwindigkeit der Spieler
export const PLAYER_SPEED = 5;

// Teamfarben
export const TEAM_COLORS = {
    RED: '#FF0000',
    BLUE: '#0000FF'
};

// Multiplayer-Konfiguration
export const MAX_PLAYERS = 34;
export const MIN_PLAYERS = 6;

// Zeitlimit (in Sekunden)
export const GAME_TIME_LIMIT = 300; // 5 Minuten

// Sonstige Konstanten
export const DEBUG_MODE = process.env.NODE_ENV === 'development';
export const SOCKET_EVENTS = {
    PLAYER_JOIN: 'playerJoin',
    PLAYER_MOVE: 'playerMove',
    PLAYER_LEAVE: 'playerLeave',
    GAME_START: 'gameStart',
    GAME_OVER: 'gameOver',
    UPDATE_SCORE: 'updateScore',
    UPDATE_TIMER: 'updateTimer'
};