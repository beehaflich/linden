


/**
 * A state of the application
 *
 * @return {void}
 * @constructor
 */
linden.state = function() {
  linden.state.states.push(this);
  this.history_ = [];
};


/**
 * Static list of states
 * When a new state is created, it's pushed onto this stack
 * The top state is always the active state
 * @type {Array}
 */
linden.state.states = [];



/**
 * Quickly grab the top state
 * @return {linden.state}
 */
linden.state.top = function() {
  return linden.state.states[linden.state.states.length - 1];
};



/**
 * The history of inputs & responses in this state
 * Will perservere until cleared
 * Initialized to empty array in constructor & on clear
 * @type {Array.<Object>=}
 */
linden.state.prototype.history_;


/**
 * The pointer to the currently viewed history input
 * This is for pressing up/down as if this were a console
 * Zero indicates the current, non-parsed input
 * Values of 1+ are from the end of the history array
 * @type {number}
 * @private
 */
linden.state.prototype.historyPointer_ = 0;


/**
 * Get the current history pointer
 * @return {Number}
 */
linden.state.prototype.getHistoryPointer = function() {
  return this.historyPointer_;
};


/**
 * Grab the previous history input
 * Returns null if there is no history whatsoever
 * @return {?String}
 */
linden.state.prototype.historyPointerUp = function() {
  var historyLength = this.history_.length;
  if (!historyLength) {
    return null;
  }
  this.historyPointer_++;
  if (this.historyPointer_ >= historyLength) {
    this.historyPointer_ = historyLength;
  }
  return this.history_[historyLength - this.historyPointer_].input;
};


/**
 * Grab the next history input
 * Returns null if you got to the very bottom
 * @return {?String}
 */
linden.state.prototype.historyPointerDown = function() {
  var historyLength = this.history_.length;
  this.historyPointer_--;
  if (this.historyPointer_ < 0) {
    this.historyPointer_ = 0;
  }
  return (
    this.historyPointer_ ?
    this.history_[historyLength - this.historyPointer_].input :
    null
  );
};




linden.state.prototype.clear = function() {
  this.history_ = [];
  // todo - remove all responses
}




linden.state.prototype.render = function() {
  this.renderHistory();
};


linden.state.prototype.renderHistory = function() {
  var newHistory = document.createElement('div');
  newHistory.id = 'history';
  // this.renderStateMessage(newHistory);
  var historyLength = this.history_.length;
  for (var i = 0; i < historyLength; i++) {
    this.renderHistoryItem(newHistory, this.history_[i]);
  }
  var historyContainer = document.getElementById('history-container');
  var oldHistory = document.getElementById('history');
  historyContainer.replaceChild(newHistory, oldHistory);
  newHistory.scrollTop = newHistory.scrollHeight;
};


linden.state.prototype.renderHistoryItem = function(parent, item) {
  var input = document.createElement('div');
  input.classnames = 'input';
  input.innerHTML = this.formatHTML('>> ' + item.input);
  parent.appendChild(input);

  var response = document.createElement('div');
  response.classnames = 'response';
  response.innerHTML = this.formatHTML(item.response);
  parent.appendChild(response);

  item.drawn = true;
};


linden.state.prototype.formatHTML = function(string) {
  // for now, just escape it
  // todo - markdown?
  var element = document.createElement('span');
  element.innerText = element.textContent = string;
  return element.innerHTML;
};


linden.state.prototype.pop = function() {
  // todo
};




/**
 * Does all the non-parsing work for handling inputs
 * @param {String} input
 * @return {void}
 */
linden.state.prototype.handleInput = function(input) {
  var response = linden.state.parseGlobal(input);
  if (response === null) {
    response = this.parse(input);
  }
  this.history_.push({
    'input': input,
    'response': response,
    'drawn': false,
  });
  this.historyPointer_ = 0;
  this.render(); // todo - efficiency
};


/**
 * Any global interrupts that defeat the state-based parse
 * A return value of null indicates that no global parse was recognized
 * @param {String} input
 * @return {?String}
 */
linden.state.parseGlobal = function(input) {
  return null;
};


/**
 * The main function to overwrite per state
 * Each state may handle parsing differently
 * By default, this simply echoes the input and warns you to overwrite it
 * @param {String} input
 * @return {String}
 */
linden.state.prototype.parse = function(input) {
  linden.log('Notice: overwrite linden.state.prototype.parse');
  return input;
};


