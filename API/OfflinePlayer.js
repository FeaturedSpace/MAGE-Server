var Player = require('../entity/Player');

class OfflinePlayer {
  constructor() {
    
  }
}

OfflinePlayer.prototype.isOnline = function() {
  return this.online;
};

OfflinePlayer.prototype.getName = function() {
  return this.name; 
};

OfflinePlayer.prototype.getUUID = function() {
  return this.uuid;
};

// TODO: Implement this.
OfflinePlayer.prototype.getPlayer = function() {
  return new Player();
};