// Sistema de salas de sessão
class SalaSystem {
    constructor() {
        this.salas = JSON.parse(localStorage.getItem('salas')) || [];
        this.currentRoom = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSalas();
    }

    bindEvents() {
        // Player
        document.getElementById('join-room').addEventListener('click', () => {
            this.joinRoom();
        });

        // Mestre
        document.getElementById('create-room').addEventListener('click', () => {
            this.createRoom();
        });

        // Ferramentas da sala
        document.getElementById('open-dice-roller').addEventListener('click', () => {
            this.openDiceRoller();
        });
    }

    // Para jogadores
    joinRoom() {
        const roomCode = prompt('Código da sala:');
        if (roomCode) {
            const room = this.salas.find(s => s.code === roomCode);
            if (room) {
                this.enterRoom(room);
            } else {
                alert('Sala não encontrada!');
            }
        }
    }

    // Para mestres
    createRoom() {
        const name = prompt('Nome da sala:');
        if (name) {
            const room = {
                id: Date.now(),
                name: name,
                code: this.generateCode(),
                master: authSystem.currentUser,
                players: [],
                created: new Date().toLocaleDateString(),
                isActive: true
            };

            this.salas.push(room);
            this.saveSalas();
            this.loadSalas();
            alert(`Sala criada! Código: ${room.code}`);
        }
    }

    generateCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    enterRoom(room) {
        this.currentRoom = room;
        this.showRoomModal(room);
    }

    showRoomModal(room) {
        document.getElementById('room-name').textContent = room.name;
        this.updateParticipants(room);
        document.getElementById('room-modal').classList.add('active');
    }

    updateParticipants(room) {
        const container = document.getElementById('room-participants');
        container.innerHTML = '';
        
        // Adicionar mestre
        const masterItem = document.createElement('li');
        masterItem.innerHTML = `<strong>${room.master}</strong> (Mestre)`;
        container.appendChild(masterItem);
        
        // Adicionar jogadores
        room.players.forEach(player => {
            const playerItem = document.createElement('li');
            playerItem.textContent = player;
            container.appendChild(playerItem);
        });
    }

    saveSalas() {
        localStorage.setItem('salas', JSON.stringify(this.salas));
    }

    loadSalas() {
        // Para jogadores - carregar salas disponíveis
        const playerContainer = document.getElementById('rooms-container');
        if (playerContainer) {
            playerContainer.innerHTML = '';
            
            this.salas.filter(room => room.isActive).forEach(room => {
                const roomElement = this.createRoomElement(room);
                playerContainer.appendChild(roomElement);
            });
        }

        // Para mestres - carregar gerenciamento de salas
        const masterContainer = document.getElementById('rooms-management-container');
        if (masterContainer) {
            masterContainer.innerHTML = '';
            
            const myRooms = this.salas.filter(room => room.master === authSystem.currentUser);
            myRooms.forEach(room => {
                const roomMgmt = this.createRoomManagement(room);
                masterContainer.appendChild(roomMgmt);
            });
        }
    }

    createRoomElement(room) {
        const element = document.createElement('div');
        element.className = 'room-item';
        element.innerHTML = `
            <h4>${room.name}</h4>
            <p><strong>Mestre:</strong> ${room.master}</p>
            <p><strong>Jogadores:</strong> ${room.players.length}</p>
            <button class="btn-primary" onclick="salaSystem.enterRoom(${JSON.stringify(room).replace(/"/g, '&quot;')})">
                Entrar
            </button>
        `;
        return element;
    }

    createRoomManagement(room) {
        const element = document.createElement('div');
        element.className = 'room-management-item';
        element.innerHTML = `
            <h4>${room.name}</h4>
            <p><strong>Código:</strong> ${room.code}</p>
            <p><strong>Status:</strong> ${room.isActive ? 'Ativa' : 'Inativa'}</p>
            <p><strong>Jogadores:</strong> ${room.players.length}</p>
            <div class="card-actions">
                <button class="btn-primary" onclick="salaSystem.manageRoom(${room.id})">Gerenciar</button>
                <button class="btn-secondary" onclick="salaSystem.toggleRoom(${room.id})">
                    ${room.isActive ? 'Desativar' : 'Ativar'}
                </button>
            </div>
        `;
        return element;
    }

    manageRoom(id) {
        const room = this.salas.find(s => s.id === id);
        if (room) {
            this.enterRoom(room);
        }
    }

    toggleRoom(id) {
        const room = this.salas.find(s => s.id === id);
        if (room) {
            room.isActive = !room.isActive;
            this.saveSalas();
            this.loadSalas();
        }
    }

    // Ferramentas da sala
    openDiceRoller() {
        alert('Abrindo Rolador de Dados');
        // Implementar rolador de dados integrado
    }
}

// Inicializar sistema de salas
const salaSystem = new SalaSystem();