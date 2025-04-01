import MockClient from "./MockClient.js"; // Importiere die Klasse MockClient

const numClients = 5; // Anzahl der simulierten Spieler
const serverUrl = "ws://localhost:3000"; // Die Server-URL hier eintragen

// Schleife, um mehrere Mock-Clients zu starten
for (let i = 0; i < numClients; i++) {
    const client = new MockClient(i, serverUrl);
    client.connect(); // Jeder Client verbindet sich mit dem Server
}
