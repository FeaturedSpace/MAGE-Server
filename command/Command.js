class Command {
  constructor(name, description, usage) {
    this.name = name;
    this.description = description;
    this.usage = usage;
  }
}

/**
 * Abstract class (overriden)
 */
Command.prototype.execute = function(sender, label, args) {};

Command.prototype.getName = function() {
  return this.name;
};

Command.prototype.getDescription = function() {
  return this.description;
}

Command.prototype.getUsage = function() {
  return this.usage;
};

Command.prototype.setName = function(newName) {
  this.name = newName;
};

Command.prototype.setDescription = function(newDescription) {
  this.description = newDescription;
};

Command.prototype.setUsage = function(newUsage) {
  this.usage = newUsage;
};

Command.prototype.isRegistered = function() {
  return (null != this.commandMap);
};

Command.prototype.register = function(commandMap) {
  if(this.allowChangesFrom(commandMap)) {
    this.commandMap = commandMap;
    return true;
  }
  
  return false;
};

Command.prototype.unregister = function(commandMap) {
  if(this.allowChangesFrom(commandMap)) {
    this.commandMap = null;
    return true;
  }
  
  return false;
};

Command.prototype.allowChangesFrom = function(commandMap) {
  var bool = (null == this.commandMap || this.commandMap == commandMap);
  return bool;
};


Command.prototype.sendCommandMessage = function(source, message) {
  
};

module.exports = Command;