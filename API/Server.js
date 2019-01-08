var log = require('loglevel');
var fs = require('fs');

class Server {
  constructor() {
    this.logger = log;
    this.usercache = fs.writeFile('usercache.json', "", function(e) {
      if(e) {
        console.log("Error creating usercache.json file");
      }
    });
    
    this.players = {};
    
    this.name = "MAGE Server";
    
    this.port = 3000;
    this.ip = process.env.ADDRESS;
  }
}

Server.prototype.getName = function() {
  return this.name;
};

Server.prototype.getVersion = function() {
  return this.version;
};

Server.prototype.getOnlinePlayers = function() {
  var onlinePlayers = {};
  for(var player in this.players) {
    onlinePlayers.push(player);
  }
  
  return onlinePlayers;
};

Server.prototype.getMaxPlayers = function() {
  return this.maxPlayers;
};

Server.prototype.getPort = function() {
  return this.port;
};

Server.prototype.getIP = function() {
  return this.ip;
};

Server.prototype.getPlayer = function() {
  
};

Server.prototype.getPlayerExact = function() {
  
};

Server.prototype.dispatchCommand = function(sender, commandLine) {
  
};

Server.prototype.getSpawnPoints = function() {
  
};

Server.prototype.setSpawnPoint = function() {
  
};

Server.prototype.setSpawnPoints = function() {
  
};

Server.prototype.broadcast = function() {
  
};

Server.prototype.getOfflinePlayer = function() {
  
};

Server.prototype.getOfflinePlayers = function() {
  
};

Server.prototype.getMOTD = function() {
  
};

Server.prototype.getItem = function() {
  
};

Server.prototype.removeItem = function() {
  
};

Server.prototype.addItem = function() {
  
};


Server.prototype.moveEntity = function() {
  
};


Server.prototype.reload = function() {
  
};

Server.prototype.shutdown = function() {
  
};