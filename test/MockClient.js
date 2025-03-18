
export default class MockClient {
    constructor(id, serverUrl) {
        this.id = id;
        this.serverUrl = serverUrl;
        this.socket = null;
    }

    
    connect() {

        //Ereignishandler
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
        console.log(`⏳ Client ${this.id} startet das Senden von Bewegungen...`);
    
        setInterval(() => {
            let randomMove = { direction: ["up", "down", "left", "right"][Math.floor(Math.random() * 4)] };
            console.log(`✅ Client ${this.id} sendet Bewegung:`, JSON.stringify(randomMove));
    
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(randomMove));
                console.log(`📤 Client ${this.id} hat Bewegung erfolgreich gesendet.`);
            } else {
                console.log(`❌ Client ${this.id} konnte Bewegung nicht senden (readyState: ${this.socket.readyState})`);
            }
        }, 2000);
    }
    
    
}   
