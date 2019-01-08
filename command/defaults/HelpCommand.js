var Command = require('../Command');
var VanillaCommand = require('../VanillaCommand');

class HelpCommand extends VanillaCommand {
  constructor() {
    super("help");
    this.description = "Shows the help menu.";
    this.usage = "Do /help to see a list of available commands.";
  }
}

HelpCommand.prototype.execute = function(sender, label, args) {
  sender.sendMessage("Available Commands:");
  sender.sendMessage("/name: Change your nickname");
  sender.sendMessage("/me: Act out a chat message (charades)");
  return true;
};