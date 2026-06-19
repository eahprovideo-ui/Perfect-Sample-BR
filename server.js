const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { 
    cors: { origin: "*", methods: ["GET", "POST"] } 
});

let matchmakingQueue = [];

io.on('connection', (socket) => {
    console.log(`> Produtor Conectado ao Servidor: ${socket.id}`);

    // Escuta o comando exato do index.html v4.3
    socket.on('join_ranked_queue', (data) => {
        const player = { id: socket.id, username: data.username, genre: data.genre };
        
        if (!matchmakingQueue.some(p => p.id === socket.id)) {
            matchmakingQueue.push(player);
            console.log(`Fila (${data.genre}): ${matchmakingQueue.length}/10`);
        }

        // Atualiza a contagem na tela LCD do site
        io.emit('queue_update', { count: matchmakingQueue.length });

        // SE CHEGAR A 10 PLAYERS, LANÇA O JOGO
        if (matchmakingQueue.length >= 10) {
            const matchId = "MATCH_" + Date.now();
            const playersInMatch = matchmakingQueue.splice(0, 10);
            
            // Envia o gatilho exato que o index.html v4.3 está esperando
            playersInMatch.forEach(p => {
                io.to(p.id).emit('match_found_trigger', { matchId, players: playersInMatch, genre: data.genre });
            });
            
            console.log(`Arena Criada: ${matchId}`);
        }
    });

    socket.on('disconnect', () => {
        matchmakingQueue = matchmakingQueue.filter(p => p.id !== socket.id);
        io.emit('queue_update', { count: matchmakingQueue.length });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`PSBR Engine v4.3 Online na Porta ${PORT}`));
