class Lobby {
    constructor(socket) {
        this.socket = socket;
        this.players = [];
        this.setupEventListeners();
        this.setupSocketListeners();
    }

    setupEventListeners() {
        document.getElementById('join-red-team').addEventListener('click', () => {
            this.socket.emit('joinTeam', 'red');
        });

        document.getElementById('join-blue-team').addEventListener('click', () => {
            this.socket.emit('joinTeam', 'blue');
        });

        document.getElementById('leave-lobby').addEventListener('click', () => {
            this.socket.emit('leaveLobby');
            window.location.href = '/login';
        });
    }

    setupSocketListeners() {
        this.socket.on('updateLobby', (players) => {
            this.players = players;
            this.renderPlayers();
        });

        this.socket.on('gameStarting', () => {
            window.location.href = '/game';
        });
    }

    renderPlayers() {
        const redTeam = document.getElementById('red-team');
        const blueTeam = document.getElementById('blue-team');

        redTeam.innerHTML = '';
        blueTeam.innerHTML = '';

        this.players.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.classList.add('player');
            playerElement.textContent = player.username;

            if (player.team === 'red') {
                redTeam.appendChild(playerElement);
            } else if (player.team === 'blue') {
                blueTeam.appendChild(playerElement);
            }
        });
    }

    render() {
        return `
            <div class="lobby-container">
                <h2>Lobby</h2>
                <div class="teams">
                    <div class="team red-team">
                        <h3>Red Team</h3>
                        <div id="red-team"></div>
                        <button id="join-red-team">Join Red Team</button>
                    </div>
                    <div class="team blue-team">
                        <h3>Blue Team</h3>
                        <div id="blue-team"></div>
                        <button id="join-blue-team">Join Blue Team</button>
                    </div>
                </div>
                <button id="leave-lobby">Leave Lobby</button>
            </div>
        `;
    }
}

export default Lobby;