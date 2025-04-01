export default class MockClient {
    constructor(id, serverUrl) {
        this.id = id;
        this.serverUrl = serverUrl;
        this.socket = null;
    }

    connect() {
        this.socket = new WebSocket(this.serverUrl);

        this.socket.onopen = () => {
            console.log(`Mock-Client ${this.id} verbunden mit ${this.serverUrl}`);
            this.startSendingMoves();
        };

        this.socket.onmessage = (event) => {
            console.log(`Client ${this.id} empfängt Server-Antwort:`, event.data);
        };

        this.socket.onerror = (error) => {
            console.error(`WebSocket-Fehler bei Client ${this.id}:`, error);
        };

        this.socket.onclose = () => {
            console.log(`Client ${this.id} getrennt.`);
        };
    }

    startSendingMoves() {
        setInterval(() => {
            let randomMove = { direction: ["up", "down", "left", "right"][Math.floor(Math.random() * 4)] };
            console.log(`Client ${this.id} sendet Bewegung:`, randomMove);
            this.socket.send(JSON.stringify(randomMove));
        }, 2000);
    }
}
