

linden.state.initial = function() {
  linden.state.apply(this, arguments);
};
linden.inherits(linden.state.initial, linden.state);


linden.state.initial.prototype.parse = function(input) {
  if (!input) {
    return '';
  }

  if (input === 'clear') {
    this.clear();
    this.render();
    return '';
  }

  var split = input.split(' ');

  var command = split[0].toLowerCase();

  if (command === 'fibonacci') {
    var amount = +split[1];
    if (isNaN(amount)) {
      return 'Invalid number of fibonaccis';
    }
    if (amount <= 2) {
      return 'Why do you need that few fibonaccis??';
    }
    var fibs = [1, 1];
    for (var i = 2; i < amount; i++) {
      fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    }
    return fibs.join(', ');
  }


  if (command === 'fizzbuzz') {
    var amount = +split[1] || 30;
    var fizzies = [];
    for (var i = 1; i <= amount; i++) {
      fizzies.push(
        (i % 3 === 0 ? (
          (i % 5 === 0 ? 'FizzBuzz' : 'Fizz')
        ) : (
          (i % 5 === 0 ? 'Buzz' : i)
        ))
      );
    }
    return fizzies.join(', ');
  }


  if (command === 'marco' || command === 'marco!') {
    return 'Polo!';
  }


  if (command === 'roll') {
    if (split[1] === 'stats') {
      var stat_totals = [];
      for (var i = 0; i < 6; i++) {
        var stat = [];
        var stat_total = 0;
        for (var j = 0; j < 4; j++) {
          var roll = Math.ceil(Math.random() * 6)
          stat.push(roll);
          stat_total += roll;
        }
        var min = Math.min.apply(window, stat);
        stat_totals.push(stat_total - min);
      }
      return stat_totals.join(', ');
    } else if (split[1]) {
      var number_of_dice = null;
      var number_of_sides = null;
      var d = split[1].split('d');
      number_of_dice = +d[0] || 1;
      number_of_sides = +d[1];
      if (!number_of_dice) {
        return 'Invalid roll syntax';
      }
      if (!number_of_sides) {
        return 'Invalid roll syntax';
      }
      var rolls = [];
      var total = 0;
      var roll;
      for (var i = 0; i < number_of_dice; i++) {
        roll = (Math.ceil(Math.random() * number_of_sides));
        rolls.push(roll);
        total += roll;
      }
      return (
        'Rolled ' + number_of_dice + ' ' +
        number_of_sides + '-sided ' +
        (number_of_dice === 1 ? 'die' : 'dice') + ': ' +
        rolls.join(', ') +
        ' (Total ' + total + ')'
      );
    } else {

    }
  }

  return '(not found) ' + input;
};


