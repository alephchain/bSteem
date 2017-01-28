var ReadPreference = require('./read-preference');

/**
 * Only allow reading from the primary of a replicaset.
 *
 * @api public
 */
ReadPreference.primary = new ReadPreference('primary');

/**
 * Read from the primary of a replicaset if available,
 * but also allow reading from secondaries.
 *
 * @api public
 */
ReadPreference.primaryPreferred = new ReadPreference('primaryPreferred');

/**
 * Only read from secondaries
 *
 * @api public
 */
ReadPreference.secondary = new ReadPreference('secondary');

/**
 * Read from secondaries but also allow reads from secondaries.
 *
 * @api public
 */
ReadPreference.secondaryPreferred = new ReadPreference('secondaryPreferred');

/**
 * Read from whatever instance is `nearest`.
 *
 * @api public
 */
ReadPreference.nearest = new ReadPreference('nearest');

/**
 * Read from any instance.
 *
 * @api public
 */
ReadPreference.any = new ReadPreference('any');

module.exports = ReadPreference;
