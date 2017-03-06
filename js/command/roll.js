

linden.command.roll = function() {
  linden.command.apply(this, arguments);
};
linden.inherits(linden.command.roll, linden.command);


linden.command.roll.prototype.run = function(args) {
  var flags = this.parseFlags(args);
  if (!args[1]) {
    return 'What did you want to roll?';
  }
  var d = args[1].split('d');
  var dice = +d[0] || 1;
  var sides = +d[1];

  var drop = +flags['-d'] || 0;

  var set = this.rollSet(
    dice,
    sides,
    drop
  );

  var lines = [];
  lines.push(
    'Rolling ' + dice + ' ' + sides + '-sided ' + (dice ? 'dice' : 'die') +
    (drop ? ('; dropping lowest ' + drop) : '')
    // (keep ? ('; keeping highest ' + keep) : '')
  );

  var total = 0;
  var line = [];
  for (var i = 0; i < dice; i++) {
    if (set[i].kept) {
      total += set[i].roll;
      line.push(set[i].roll);
    } else {
      line.push('(' + set[i].roll + ')');
    }
  }
  lines.push(line.join(', '));

  lines.push('Total: ' + total);

  return lines.join('\n');
};


linden.command.roll.prototype.rollDie = function(sides) {
  return Math.ceil(Math.random() * sides);
};

linden.command.roll.prototype.rollSet = function(dice, sides, drop) {
  var rolls = [];
  for (var i = 0; i < dice; i++) {
    rolls.push({
      'roll': this.rollDie(sides),
      'order': i,
      'kept': true,
    });
  }

  if (drop) {
    rolls.sort(function(a, b) {
      return a.roll - b.roll;
    });
    for (var i = 0; i < drop && i < dice; i++) {
      rolls[i].kept = false;
    }
  }
  // if (keep) {
  //   rolls.sort(function(a, b) {
  //     return b.roll - a.roll;
  //   });
  //   for (var i = 0; i < dice; i++) {
  //     if (i < keep) {
  //       rolls[i].kept = true;
  //     } else {
  //       rolls[i].kept = false;
  //     }
  //   }
  // }

  rolls.sort(function(a, b) {
    return a.order - b.order;
  });

  return rolls;
};

