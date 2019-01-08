var OfflinePlayer = require('../API/OfflinePlayer');

var RawChatPacket = require('../packets/PlayerPackets');

class Player extends OfflinePlayer {
  constructor(server, entity) {
    this.hiddenPlayers = new Map();
    this.health = 100;
  }
}

Player.prototype.isOP = function() {
  return this.op;
};

Player.prototype.setOP = function() {
  this.op = !this.op;
};

Player.prototype.getDisplayName = function() {
  return this.displayName;
};

Player.prototype.setDisplayName = function(newName) {
  // TODO: Filter input.
  this.displayName = newName;
};

Player.prototype.getAddress = function() {
  return this.addressID;
};

Player.prototype.sendRawMessage = function(message) {
  if(this.socket === null || this.deleted) return;
  
  this.socket.emit(RawChatPacket, message);
};

Player.prototype.kickPlayer = function(message) {
  if(this.socket === null || this.deleted) return;
  
  this.socket.emit('disconnect', (message == null ? "" : message));
};

Player.prototype.chat = function(message) {
  this.socket.broadcast.emit('chat', message);
};

Player.prototype.performCommand = function(command) {
  return this.server.dispatchCommand(this, command);
};

Player.prototype.isCrouching = function() {
  return this.crouching;
};

Player.prototype.setCrouching = function(crouching) {
  this.crouching = crouching;
  this.socket.emit('crouch', crouching);
};

Player.prototype.isSprinting = function() {
  return this.sprinting;
};

Player.prototype.setSprinting = function(sprinting) {
  this.sprinting = sprinting;
  this.socket.emit('sprint', sprinting);
};

Player.prototype.saveData = function() {
  // Save data to player file.
};

Player.prototype.loadData = function() {
  // Load data from player file.
};

Player.prototype.playSound = function() {
  // Send a sound to the player.
};

Player.prototype.updateInventory = function() {
  // Update their inventory (guns, weapons, ammo, etc.)
};

Player.prototype.giveXP = function(xp) {
  // Give the player's profile XP.
};

Player.prototype.getXP = function() {
  return this.xp;
};

Player.prototype.setXP = function(newXP) {
  this.xp = newXP;
  this.socket.emit('xp', this.xp);
};

Player.prototype.hidePlayer = function(player) {
  
};

Player.prototype.showPlayer = function(player) {
  
};

Player.prototype.canSee = function(player) {
  
};

Player.prototype.isOnGround = function() {
  
};

Player.prototype.isFlying = function() {
  return this.flying;
};

Player.prototype.setFlying = function(flying) {
  this.flying = flying;
  this.socket.emit('flying', flying);
};

Player.prototype.respawn = function() {
  
};

Player.prototype.getHiddenPlayers = function() {
  
};

