var Command = require('../command/Command');

var Tools = {
  CommandChecker: {
    isCommand: function(msg) {
      return msg.startsWith('/');
    },
    
    toCommand: function(inputMsg) {
      var msg = inputMsg.replace("/", "");
      var commands = msg.split(" ");

      var command = commands[0];
      var args = commands.slice(1, 2);

      return new Command(command, args);
    }
  }
};