var Command = require('./Command');

class VanillaCommand extends Command {
  constructor(name, description, usageMessage) {
    super(name, description, usageMessage);
  }
}

VanillaCommand.prototype.matches = function(input) {
  return input.localeCompare(this.getName());
};