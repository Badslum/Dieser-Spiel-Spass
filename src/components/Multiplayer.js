import io from 'socket.io-client';

class Multiplayer {
    constructor(serverUrl, game) {
        this.socket = io(serverUrl);
        this.game = game;

        this.setupListeners();
    }

    setupListeners() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('playerJoined', (playerData) => {
            this.game.addPlayer(playerData);
        });

        this.socket.on('playerMoved', (playerData) => {
            const player = this.game.players.find(p => p.id === playerData.id);
            if (player) {
                player.x = playerData.x;
                player.y = playerData.y;
                player.direction = playerData.direction;
            }
        });

        this.socket.on('playerLeft', (playerId) => {
            this.game.players = this.game.players.filter(p => p.id !== playerId);
        });

        this.socket.on('gameOver', () => {
            this.game.endGame();
        });
    }

    sendPlayerMove(player) {
        this.socket.emit('playerMove', {
            id: player.id,
            x: player.x,
            y: player.y,
            direction: player.direction
        });
    }
}

export default Multiplayer;


// Verwendung von socket.js in Multiplayer.js

import socket, { sendMessage, onMessage } from '../utils/socket.js';
import { SOCKET_EVENTS } from '../utils/constants.js';

