// Script principal para funcionalidades comuns
document.addEventListener('DOMContentLoaded', function() {
    // Navegação para jogadores
    document.querySelectorAll('#player-screen .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Navegação para mestres
    document.querySelectorAll('#master-screen .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Função para alternar entre seções
    function switchSection(sectionId) {
        // Atualizar navegação ativa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');

        // Mostrar seção correspondente
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId + '-section').classList.add('active');
    }

    // Fechar modais ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Integração Worldbear
    document.getElementById('connect-worldbear').addEventListener('click', function() {
        alert('Conectando ao Worldbear...');
        // Implementar integração real com Worldbear API
    });

    // Gerador de NPCs
    document.getElementById('generate-npc').addEventListener('click', function() {
        generateNPC();
    });

    // Gerador de Encontros
    document.getElementById('generate-encounter').addEventListener('click', function() {
        generateEncounter();
    });
});

// Gerador simples de NPC
function generateNPC() {
    const names = ['Aelar', 'Borin', 'Celia', 'Darian', 'Elena', 'Fargrim'];
    const races = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Meio-Elfo', 'Tiefling'];
    const classes = ['Guerreiro', 'Mago', 'Ladino', 'Clérigo', 'Ranger', 'Bardo'];
    const personalities = ['Alegre', 'Sério', 'Desconfiado', 'Amigável', 'Reservado', 'Extrovertido'];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const race = races[Math.floor(Math.random() * races.length)];
    const cls = classes[Math.floor(Math.random() * classes.length)];
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    
    alert(`NPC Gerado:\nNome: ${name}\nRaça: ${race}\nClasse: ${cls}\nPersonalidade: ${personality}`);
}

// Gerador simples de Encontro
function generateEncounter() {
    const difficulties = ['Fácil', 'Médio', 'Difícil', 'Mortal'];
    const environments = ['Floresta', 'Caverna', 'Ruínas', 'Cidade', 'Deserto'];
    const enemyTypes = ['Goblins', 'Orcs', 'Bandidos', 'Zumbis', 'Animais Selvagens'];
    
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const environment = environments[Math.floor(Math.random() * environments.length)];
    const enemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyCount = Math.floor(Math.random() * 8) + 2;
    
    alert(`Encontro Gerado:\nDificuldade: ${difficulty}\nAmbiente: ${environment}\nInimigos: ${enemyCount} ${enemy}`);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}