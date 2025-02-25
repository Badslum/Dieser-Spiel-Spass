import io from 'socket.io-client';

// WebSocket-Verbindung zum Server herstellen
const socket = io(process.env.SERVER_URL || 'http://localhost:3000');

// Ereignis-Listener hinzufügen
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Funktion zum Senden von Nachrichten
export function sendMessage(event, data) {
    socket.emit(event, data);
}

// Funktion zum Empfangen von Nachrichten
export function onMessage(event, callback) {
    socket.on(event, callback);
}

// Funktion zum Trennen der Verbindung
export function disconnectSocket() {
    socket.disconnect();
}

export default socket;