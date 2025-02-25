// Hilfsfunktionen für das Spiel

// Funktion zur Berechnung der Distanz zwischen zwei Punkten
export function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Funktion zur Generierung einer Zufallszahl in einem Bereich
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funktion zur Formatierung der Zeit (z. B. für den Timer)
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Funktion zur Überprüfung, ob ein Spieler innerhalb des Spielfelds ist
export function isInsideCanvas(x, y, canvasWidth, canvasHeight) {
    return x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight;
}

// Funktion zum Debuggen (nur in der Entwicklungsumgebung aktiv)
export function debugLog(message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(message);
    }
}