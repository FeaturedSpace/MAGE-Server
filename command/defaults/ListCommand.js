var VanillaCommand = require('../VanillaCommand');

class ListCommand extends VanillaCommand {
  constructor() {
    super("list");
    this.description = "List all online players";
    this.usage = "/list";
  }
}

ListCommand.prototype.execute = function(sender, label, args) {
  
};