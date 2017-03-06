


linden.command = function() {
  // notta?
};


linden.command.prototype.run = function(args) {
  var flags = this.parseFlags(args);
  return 'Command not set up';
};

linden.command.parseSplit = function(input) {
  return input.split(/ +/g); // bare bones for now
};

linden.command.prototype.parseFlags = function(args) {
  var flags = {};
  var flag = null;
  var len = args.length;
  for (var i = 0; i < args.length; i++) {
    if (args[i].charAt(0) === '-') {
      flag = i;
    } else if (flag !== null) {
      flags[args[flag]] = args[i];
      flag = null;
    }
  }
  return flags;
};

linden.command.prototype.help = function() {
  return 'No help provided';
};





