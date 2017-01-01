

// if you're using ie8, you can deal with this not working on your own
document.addEventListener('DOMContentLoaded', function(e) {
  // replace this with whatever your preferred startup state is
  // this is intended as an example to prove that input/history/etc work
  new linden.state.initial().render();

  // set up a warning if logging is turned on
  if (linden.getLog()) {
    linden.log(
      'Logging is currently turned ON!',
      'To turn off, run linden.setLog(false)'
    );
  }

  var input = document.getElementById('input');

  // setup the main input listeners
  var dirtyValue = '';
  input.addEventListener('keydown', function(event) {
    // todo - is this the optimal method for detecting these keypresses?
    if (event.keyCode === 13) { // enter
      linden.state.top().handleInput(this.value);
      this.value = '';
      dirtyValue = '';
      try {
        this.focus();
      } catch (e) {}
    } else if (event.keyCode === 38) { // up arrow
      var value = linden.state.top().historyPointerUp();
      if (value !== null) {
        this.value = value;
      }
      event.preventDefault();
    } else if (event.keyCode === 40) { // down arrow
      var value = linden.state.top().historyPointerDown();
      if (value === null) {
        this.value = dirtyValue;
      } else {
        this.value = value;
      }
      event.preventDefault();
    }
  });
  input.addEventListener('keyup', function(event) {
    if (!linden.state.top().getHistoryPointer()) {
      dirtyValue = this.value;
    }
  });

  // focus the main input initially
  setTimeout(function() {
    // some browsers *cough* need a little extra rendering time
    // timeout of 0 isn't actually 0ms, just until the queue is done
    try {
      input.focus();
    } catch (e) {
      // what crapass browser are you even using?
      // if you need a fallback for this, put in a pull request
    }
  }, 0);
});



