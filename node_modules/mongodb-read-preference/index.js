var inherits = require('util').inherits;

var ReadPreference = require('./read-preference');
var DriverReadPreference;
var CoreReadPreference;
try {
  DriverReadPreference = require('mongodb').ReadPreference;
} catch (e) {
  DriverReadPreference = null;
}

try {
  CoreReadPreference = require('mongodb-core').ReadPreference;
} catch (e) {
  CoreReadPreference = null;
}

if (DriverReadPreference) {
  inherits(ReadPreference, DriverReadPreference);
} else if (CoreReadPreference) {
  inherits(ReadPreference, CoreReadPreference);
}


module.exports = exports = ReadPreference;

/**
 * Only allow reading from the primary of a replicaset.
 *
 * @api public
 */
exports.primary = new ReadPreference('primary');

/**
 * Read from the primary of a replicaset if available,
 * but also allow reading from secondaries.
 *
 * @api public
 */
exports.primaryPreferred = new ReadPreference('primaryPreferred');

/**
 * Only read from secondaries
 *
 * @api public
 */
exports.secondary = new ReadPreference('secondary');

/**
 * Read from secondaries but also allow reads from secondaries.
 *
 * @api public
 */
exports.secondaryPreferred = new ReadPreference('secondaryPreferred');

/**
 * Read from whatever instance is `nearest`.
 *
 * @api public
 */
exports.nearest = new ReadPreference('nearest');

/**
 * Read from any instance.
 *
 * @api public
 */
exports.any = new ReadPreference('any');
