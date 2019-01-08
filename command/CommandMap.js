var Command = require('./Command');

class CommandMap {
  constructor(server) {
    this.server = server;
    
    this.knownCommands = new Map();
  }
}

CommandMap.prototype.setDefaultCommands = function() {
  
};

CommandMap.prototype.setFallbackCommands = function() {
  
};

CommandMap.prototype.registerAll = function(fallbackPrefix, commands) {
  if (commands != null) {
    for (var c in commands) {
      this.register(fallbackPrefix, c);
    }
  }
};

CommandMap.prototype.register = function(fallbackPrefix, command) {
  command.register(this); // Just tell the command it's been registered now.
  if(this.knownCommands.get(command.getName())) {
    this.knownCommands.set(fallbackPrefix + ":" + command.getName(), command); // Set it in our own map database.
    return false;
  } else {
    this.knownCommands.set(command.getName(), command);
    return true;
  }
};

CommandMap.prototype.dispatch = function(sender, commandLine) {
  var args = commandLine.replace(" ", "");
  
  if(args.length == 0) {
    return false;
  }
  
  var commandLabel = args[0].toLowerCase();
  var target = this.getCommand(commandLabel); // Get the command from our known commands.
  
  try {
    target.execute(sender, commandLabel, args.slice(1, 2));
  } catch(e) {
    e.printStackTrace();
  }
  
  return true; // Return true if command was well handled.
};

CommandMap.prototype.clearCommands = function() {
  for(var entry in this.knownCommands) {
    entry[1].unregister(this); // Tell the command it's been cleared.
  }
  
  this.knownCommands.clear();
  this.setDefaultCommands();
};

CommandMap.prototype.getCommand = function(name) {
  var target = this.knownCommands.get(name.toLowerCase());
  return target;
};

CommandMap.prototype.getCommands = function() {
  return this.knownCommands.values();
};

module.exports = CommandMap;
