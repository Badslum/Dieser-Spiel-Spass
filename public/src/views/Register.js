class Register {
    constructor(socket) {
        this.socket = socket;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('register-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            this.socket.emit('register', { username, email, password }, (response) => {
                if (response.success) {
                    window.location.href = '/login';
                } else {
                    alert('Registration failed: ' + response.message);
                }
            });
        });
    }

    render() {
        return `
            <div class="register-container">
                <form id="register-form">
                    <h2>Register</h2>
                    <input type="text" id="register-username" placeholder="Username" required />
                    <input type="email" id="register-email" placeholder="Email" required />
                    <input type="password" id="register-password" placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        `;
    }
}

export default Register;