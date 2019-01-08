var server = require('http').createServer();
var io = require('socket.io')(server);

var Tools = require('./tools/Tools');
var Command = require('./command/Command');

var CommandMap = require('./command/CommandMap');


var players = {};
var commands = new CommandMap(this);

var objects = {
  create: function(data) {
    // Code for creating new objects on the server.
  }
};
var messages = {};

var SpawnPoints = {
  spawnPoints: [{
      x: -12.706,
      y: 0.5,
      z: 0
    },
    {
      x: -2.28,
      y: 0.5,
      z: -23.73
    },
    {
      x: 12.197,
      y: 4,
      z: 0.679
    },
    {
      x: 3.378,
      y: 0.5,
      z: 15.888
    }
  ],

  getRandomSpawn: function() {
    return this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
  }
};

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

  this.displayItem = 0;
  this.shooting = false;

  this.name = "Guest";

  this.setPosition = function(pos) {
    this.x = pos.x;
    this.y = pos.y;
    this.z = pos.z;
  };

  this.entity = null;
}

function Message(data) {
  this.sender = data.sender;
  this.text = data.text;
  this.time = data.time;
}

io.sockets.on('connection', function(socket) {

  socket.on('initialize', function() {
    var id = socket.id;
    var newPlayer = new Player(id);
    players[id] = newPlayer;

    newPlayer.setPosition(SpawnPoints.getRandomSpawn());
    socket.emit('spawn', newPlayer);
    console.log('New player: ' + id);

    socket.emit('playerData', {
      id: id,
      players: players
    });

    socket.broadcast.emit('playerJoined', newPlayer);
    console.log('ID: ' + id + ' | ' + 'Initialized!');
  });

  socket.on('positionUpdate', function(data) {
    if (!players[data.id]) {
      console.log('Player: ' + players[data.id] + 'does not exist');
      return;
    }

    players[data.id].x = data.x;
    players[data.id].y = data.y;
    players[data.id].z = data.z;

    console.log('[POS] ID: ' + data.id + ' | ' + 'X: ' + players[data.id].x + ' Y: ' + players[data.id].y + ' Z: ' + players[data.id].z);

    // Individual Packet Simulation
    socket.broadcast.emit('playerMoved', data);
  });

  socket.on('rotationUpdate', function(data) {
    if (!players[data.id]) return;
    players[data.id].rotX = data.rotX;
    players[data.id].rotY = data.rotY;
    players[data.id].rotZ = data.rotZ;
    players[data.id].rotW = data.rotW;

    console.log('[ROT] ID: ' + data.id + ' | ' + 'X: ' + players[data.id].rotX + ' Y: ' + players[data.id].rotY + ' Z: ' + players[data.id].rotZ + ' W: ' + players[data.id].rotW);

    // Individual Packet Simulation
    socket.broadcast.emit('playerTurned', data);
  });

  socket.on('animationUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.id].currentAnimation = data.animation;

    // Individual Packet Simulation
    socket.broadcast.emit('playerAnimation', data);
  });

  socket.on('inventoryUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.id].displayItem = data.slot;

    // Individual Packet Simulation
    socket.broadcast.emit('playerInventory', data);
    console.log("[ITEM] " + "ID: " + data.id + "; Item: " + data.item);
  });

  socket.on('shootingUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.id].shooting = data.shooting;

    // Individual Packet Simulation
    socket.broadcast.emit('playerShooting', data);
  });

  socket.on('damageUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.otherId].health -= data.damage;

    // Individual Packet Simulation
    socket.broadcast.emit('playerDamage', data);
  });

  socket.on('deathUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.id].dead = data.dead;



    // Individual Packet Simulation
    socket.broadcast.emit('playerDeath', data);

    // Send the player a packet to respawn after 10 seconds.
    setTimeout(function() {
      socket.emit('respawn');
    }, 10000);
  });

  socket.on('respawnUpdate', function(data) {
    if (!players[data.id]) return;

    // The player has clicked the respawn and are back in game. Tell everyone.
    players[data.id].dead = data.dead;

    socket.broadcast.emit('playerSpawn', data);
  });

  socket.on('objectUpdate', function(data) {
    if (!players[data.id]) return;

    if (data.create) {
      var object = new Object(data);
      objects.push(object);
    } else if (data.destroy) {
      objects.splice(objects.indexOf(new Object(data)), 1);
    } else if (data.update) {
      objects.indexOf(new Object(data)).update(data);
    }

    // Individual Packet Simulation
    socket.broadcast.emit('objectUpdate', data);
  });

  socket.on('nameUpdate', function(data) {
    if (!players[data.id]) return;

    players[data.id].name = data.name;
    console.log("[NAME] ID: " + data.id + "; Name:" + data.name);

    // Individual Packet Simulation

    socket.broadcast.emit('playerName', data);
  });

  socket.on('message', function(data) {
    if (!players[data.id]) return;

    data.sender = players[data.id].name;
    
    if(Tools.CommandChecker.isCommand(data.msg)) {
      // Run Command Handlers.
      commands.dispatchCommand(players[data.id], data.msg);
    }
    
    messages.push(new Message(data));
    
    // Individual Packet Simulation
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', function() {
    if (!players[socket.id]) return;
    delete players[socket.id];

    // Update clients with the new player killed 
    socket.broadcast.emit('killPlayer', socket.id);
  });
});

/// UTILITIES AND TOOLS ///

// RUN OUR SERVER LOOP AT 30 FPS
// setInterval(function() {
//     io.emit('packet', players);
//     // console.log('[PACKET] EMITTED | Length: ' + players[ids[0]]);
// }, 1000 / 30);


console.log('MAGE Server Activated... PORT: ' + process.env.PORT);
server.listen(3000);