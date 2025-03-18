//server initialiseren
import { WebSocketServer } from "ws";
import { movePlayer, createPlayer } from "./game/player.js"; // Spielerfunktionen importieren

const wss = new WebSocketServer({ port: 8080 });
const players = {}; // Speichert Spieler-Objekte nach ID

console.log("✅ WebSocket-Server läuft auf ws://localhost:8080");

wss.on("connection", (ws) => {
    console.log("🔗 Ein Client hat sich verbunden.");

    // Erstelle einen neuen Spieler für diesen Client
    const playerId = `player_${Math.random().toString(36).substr(2, 9)}`;
    players[playerId] = createPlayer(playerId, playerId);


    //WebSocket kommunikation (Bidirektional) über TCP
    ws.on("message", (message) => {
        console.log(`📩 Nachricht vom Client erhalten: ${message.toString()}`);

        try {
            const data = JSON.parse(message);
            if (data.direction) {
                console.log(`➡️ Bewegung erkannt: ${data.direction}`);

                //Bewege den Spieler
                movePlayer(players[playerId], data.direction);

                console.log(`📍 Neuer Standort von ${playerId}: X=${players[playerId].x}, Y=${players[playerId].y}`);

                //Sende die neue Position zurück an den Client
                ws.send(JSON.stringify({
                    playerId: playerId,
                    x: players[playerId].x,
                    y: players[playerId].y
                }));
            } else {
                console.log(`📩 Unbekannte JSON-Nachricht:`, data);
            }
        } catch (error) {
            console.log(`📩 Nicht-JSON-Nachricht empfangen:`, message.toString());
        }
    });

    ws.on("close", () => {
        console.log(`❌ Spieler ${playerId} hat die Verbindung getrennt.`);
        delete players[playerId]; // Entferne den Spieler aus der Liste
    });
});
