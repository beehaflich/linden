


/**
 * Linden namespace
 * @type {Object}
 */
var linden = {};


/**
 * Inherit methods
 * @param {Object} childClass
 * @param {Object} parentClass
 * @return {void}
 */
linden.inherits = function(childClass, parentClass) {
  function tmp() {};
  tmp.prototype = parentClass.prototype;
  childClass.prototype = new tmp();
  childClass.prototype.constructor = childClass;
  childClass.prototype.superClass_ = parentClass.prototype;
};


/**
 * If we have logging turned on
 * @type {boolean}
 * @private
 */
linden.log_ = true;


/**
 * Set the log parameter
 * @param {boolean} log
 */
linden.setLog = function(log) {
  linden.log_ = log;
};


/**
 * Get the log parameter
 * @return {boolean}
 */
linden.getLog = function() {
  return linden.log_;
};


/**
 * Log to the console
 * Doesn't break in terrible browsers without consoles
 * Won't log if global logging is turned off
 * @return {void}
 */
linden.log = function() {
  if (!console) {
    return;
  }
  if (!console.log) {
    return;
  }
  if (!linden.log_) {
    return;
  }
  console.log.apply(window, arguments);
};


