class Login {
    constructor(socket) {
        this.socket = socket;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('login-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            this.socket.emit('login', { username, password }, (response) => {
                if (response.success) {
                    window.location.href = '/lobby';
                } else {
                    alert('Login failed: ' + response.message);
                }
            });
        });
    }

    render() {
        return `
            <div class="login-container">
                <form id="login-form">
                    <h2>Login</h2>
                    <input type="text" id="login-username" placeholder="Username" required />
                    <input type="password" id="login-password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    }
}

export default Login;