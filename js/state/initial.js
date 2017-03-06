

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

  // var split = input.split(' ');
  var split = linden.command.parseSplit(input);

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
    return new linden.command.roll().run(split);
  }

  return '(not found) ' + input;
};


