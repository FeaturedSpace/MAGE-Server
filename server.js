var server = require('http').createServer();
var io = require('socket.io')(server);

var players = {};

function Player(id) {
    this.id = id;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.rotW = 0;

    this.currentAnimation = 'Idle';

    this.entity = null;
}

io.sockets.on('connection', function(socket) {

    socket.on('initialize', function() {
        var id = socket.id;
        var newPlayer = new Player(id);
        players[id] = newPlayer;
        
        socket.emit('playerData', {
            id: id,
            players: players
        });
      
        socket.broadcast.emit('playerJoined', newPlayer);
    });

    socket.on('positionUpdate', function(data) {
        if (!players[data.id]) return;
        players[data.id].x = data.x;
        players[data.id].y = data.y;
        players[data.id].z = data.z;
      
        console.log('[POS] ID: ' + data.id + ' | ' + 'X: ' + players[data.id].x + ' Y: ' + players[data.id].y + ' Z: ' + players[data.id].z);

        // Individual Packet Simulation
        socket.broadcast.emit ('playerMoved', data);
    });

    socket.on('rotationUpdate', function(data) {
        if (!players[data.id]) return;
        players[data.id].rotX = data.rotX;
        players[data.id].rotY = data.rotY;
        players[data.id].rotZ = data.rotZ;
        players[data.id].rotW = data.rotW;
      
        console.log('[ROT] ID: ' + data.id + ' | ' + 'X: ' + players[data.id].rotX + ' Y: ' + players[data.id].rotY + ' Z: ' + players[data.id].rotZ + ' W: ' + players[data.id].rotW);

        // Individual Packet Simulation
        socket.broadcast.emit ('playerTurned', data);
    });

    socket.on('animationUpdate', function(data) {
        if (!players[data.id]) return;
      
        players[data.id].currentAnimation = data.animation;
        
        // Individual Packet Simulation
        socket.broadcast.emit('playerAnimation', data);
    });

    socket.on('disconnect', function() {
        if (!players[socket.id]) return;
        delete players[socket.id];
        // Update clients with the new player killed 
        socket.broadcast.emit('killPlayer', socket.id);
    });
});

// RUN OUR SERVER LOOP AT 30 FPS
// setInterval(function() {
//     io.emit('packet', players);
//     // console.log('[PACKET] EMITTED | Length: ' + players[ids[0]]);
// }, 1000 / 30);


console.log('MAGE Server Activated...');
server.listen(process.env.PORT);