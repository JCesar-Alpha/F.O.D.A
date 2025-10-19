// Sistema de autenticação
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.userType = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkExistingSession();
    }

    bindEvents() {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('player-logout').addEventListener('click', () => {
            this.handleLogout();
        });

        document.getElementById('master-logout').addEventListener('click', () => {
            this.handleLogout();
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('user-type').value;

        // Simulação de autenticação
        if (username && password && userType) {
            this.currentUser = username;
            this.userType = userType;
            
            // Salvar sessão
            localStorage.setItem('currentUser', username);
            localStorage.setItem('userType', userType);
            
            this.showUserScreen();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    handleLogout() {
        this.currentUser = null;
        this.userType = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userType');
        this.showLoginScreen();
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('currentUser');
        const savedType = localStorage.getItem('userType');
        
        if (savedUser && savedType) {
            this.currentUser = savedUser;
            this.userType = savedType;
            this.showUserScreen();
        }
    }

    showLoginScreen() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('login-screen').classList.add('active');
    }

    showUserScreen() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        if (this.userType === 'player') {
            document.getElementById('player-screen').classList.add('active');
            document.getElementById('player-username').textContent = this.currentUser;
        } else if (this.userType === 'master') {
            document.getElementById('master-screen').classList.add('active');
            document.getElementById('master-username').textContent = this.currentUser;
        }
    }
}

// Inicializar sistema de autenticação
const authSystem = new AuthSystem();