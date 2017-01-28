var NEEDS_SLAVE_OK = [
  'primaryPreferred',
  'secondary',
  'secondaryPreferred',
  'nearest',
  'any'
];

/**
 * @param {String} mode
 * @param {Object} tags
 * @param {Object} [options]
 * @option {Boolean} slave_ok - Manually override sending the slaveOk bit.
 * @return {ReadPreference}
 * @api public
 */
function ReadPreference(mode, tags, options) {
  if (!(this instanceof ReadPreference)) {
    return new ReadPreference(mode, tags, options);
  }
  options = options || {};

  this.mode = mode;
  this.tags = tags || [];
  this.options = options;
  this.slave_ok = options.slave_ok || NEEDS_SLAVE_OK.indexOf(this.mode) > -1;
}

/**
 * This needs slaveOk bit set
 *
 * @return {Boolean}
 * @api private
 */
ReadPreference.prototype.slaveOk = function() {
  return this.slave_ok;
};

/**
 * Are the two read mode equivalent
 * in terms of modes built into the wire prototcol.
 *
 * @param {ReadPreference} a
 * @return {Boolean}
 * @api private
 */
ReadPreference.prototype.equals = function(a) {
  return a.mode === this.mode;
};

ReadPreference.prototype.toJSON = function() {
  return {
    mode: this.mode,
    tags: this.tags,
    options: this.options
  };
};

module.exports = exports = ReadPreference;
