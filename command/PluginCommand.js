var Command = require('./Command');
var CommandExecutor = require('./CommandExecutor');

class PluginCommand extends Command {
  constructor(name, owner) {
    super(name);
    this.executor = owner;
    this.owningPlugin = owner;
    this.usageMessage = "";
  }
}

PluginCommand.prototype.execute = function(sender, label, args) {
  var success = false;
  
  if(!this.owningPlugin.isEnabled()) {
    return false;
  }
  
  try {
    success = this.executor.onCommand(sender, this, label, args);
  } catch(e) {
    e.printStackTrace();
  }
  
  if(!success && this.usageMessage.length() > 0) {
    for(var line in this.usageMessage.replace("<command>", label).split("\n")) {
      sender.sendMessage(line);
    }
  }
  
  return success;
};

PluginCommand.prototype.setExecutor = function(executor) {
  this.executor = executor == null ? this.owningPlugin : executor;
};

PluginCommand.prototype.getExecutor = function() {
  return this.executor;
};

PluginCommand.prototype.getPlugin = function() {
  return this.owningPlugin;
};