import { WebSocketServer } from "ws"; // WebSocket Server aus "ws"-Modul

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws, req) => {
    console.log("Neuer Client verbunden!");

    ws.on("message", (message) => {
        console.log("Nachricht erhalten:", message.toString());
        ws.send(`Echo: ${message}`);
    });

    ws.on("close", () => {
        console.log("Client hat die Verbindung geschlossen.");
    });
});

console.log("WebSocket-Server läuft auf ws://localhost:3000");
