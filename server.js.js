const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let matchmakingQueue = [];

io.on('connection', (socket) => {
    console.log(`> Produtor Logado: ${socket.id}`);

    socket.on('join_arena', (data) => {
        const player = { id: socket.id, username: data.username, rank: data.rank };
        if (!matchmakingQueue.some(p => p.id === socket.id)) {
            matchmakingQueue.push(player);
        }

        io.emit('queue_update', { count: matchmakingQueue.length });

        // SE CHEGAR A 10 PLAYERS, LANÇA O JOGO
        if (matchmakingQueue.length >= 10) {
            const matchId = "MATCH_" + Date.now();
            const playersInMatch = matchmakingQueue.splice(0, 10);
            
            playersInMatch.forEach(p => {
                io.to(p.id).emit('match_found', { matchId, players: playersInMatch });
            });
            
            // Inicia o Timer de 15 Minutos de Produção
            startProductionTimer(matchId);
        }
    });

    socket.on('disconnect', () => {
        matchmakingQueue = matchmakingQueue.filter(p => p.id !== socket.id);
    });
});

function startProductionTimer(matchId) {
    let timeLeft = 15 * 60;
    const timer = setInterval(() => {
        timeLeft--;
        io.emit(`${matchId}_timer`, { timeLeft });
        if (timeLeft <= 0) clearInterval(timer);
    }, 1000);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`PSBR Engine v4.0 Online na Porta ${PORT}`));