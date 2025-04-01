// Check for Player amount
// Check for % of Territories
//
// ToDo for Christian Weissbrod

//Created By Christian Weisbrod 12.03.25 - updated 12.03.25-13Uhr

// Importiere das Socket.IO-Backend
const io = require("../server");

// Punktestände separat verwalten
let scores = {}; // Speichert Punktestände unabhängig vom player-Objekt
let grids = {};  // Speichert die Spielfelder der Spieler

// Funktion: Spieler registrieren
function addPlayer(playerId, grid) {
    scores[playerId] = 0; // Startpunktestand
    grids[playerId] = grid; // Spielfeld speichern
}

// Funktion: Punktestand basierend auf der eingenommenen Fläche berechnen
function updateScore(playerId) {
    if (grids[playerId]) {
        const totalCells = grids[playerId].length * grids[playerId][0].length;
        const ownedCells = grids[playerId].flat().filter(cell => cell === parseInt(playerId.slice(-1))).length; 
        
        scores[playerId] = ((ownedCells / totalCells) * 100).toFixed(2); // Prozentwert berechnen
        io.emit("scoreUpdated", { playerId, state: scores[playerId] });
    }
}

// Funktion: Spieler stirbt -> Punktestand auf 0 setzen
function playerDied(playerId) {
    if (scores[playerId] !== undefined) {
        scores[playerId] = 0;
        io.emit("scoreUpdated", { playerId, state: 0 });
    }
}

// Funktion: Die Top 3 Spieler abrufen
function getTop3Players() {
    return Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);
}

// Funktion: Spieler entfernen
function removePlayer(playerId) {
    delete scores[playerId];
    delete grids[playerId];
    io.emit("playerRemoved", { playerId });
}

// Exporte
module.exports = {
    addPlayer,
    updateScore,
    playerDied,
    getTop3Players,
    removePlayer
};
