import MockClient from "./MockClient.js";  // Importiere die MockClient-Klasse

const numClients = 5;  // Anzahl der simulierten Clients
const serverUrl = "ws://localhost:8080";  // WebSocket-Server-Adresse

// Erstelle mehrere Clients, die sich mit dem WebSocket-Server verbinden
for (let i = 0; i < numClients; i++) {
    const client = new MockClient(i, serverUrl);
    client.connect();  // Jeder Client verbindet sich mit dem WebSocket-Server
}

console.log(`${numClients} MockClients wurden gestartet und verbinden sich mit ${serverUrl}`);
