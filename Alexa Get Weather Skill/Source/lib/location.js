'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;
exports.setLocation = setLocation;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _geocoder = require('geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dynasty = require('dynasty');

var _dynasty2 = _interopRequireDefault(_dynasty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Geocoder = _bluebird2.default.promisifyAll(_geocoder2.default);
var config = _dotenv2.default.config();
var dynoClient = (0, _dynasty2.default)({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});
var users = dynoClient.table(config.AWS_DYNAMODB_USERS_TABLE);

/**
 * Saves coordinates to the database.
 * @param {Object} userId
 * @returns {Promise}
 */
function save(userId, coord) {
  return users.insert({
    userId: userId,
    location: coord
  });
}

/**
 * Loads coordinates from the database.
 * @param {Object} userId
 * @returns {Promise}
 */
function load(userId) {
  return users.find(userId).then(function (user) {
    return user && user.location || _bluebird2.default.reject('User not found.');
  });
}

/**
* Turns a place into latitude and longitude coordinates.
* @param {String} place
* @returns {Promise}
*/
function geocode(place) {
  return Geocoder.geocodeAsync(place).then(function (data) {
    return data.results[0].geometry.location;
  });
}

/**
 * Returns the coordinates for either a requested or previously saved location.
 * @param {Object} userId
 * @returns {Promise}
 */
function getLocation(userId, location) {
  return location ? geocode(location) : load(userId);
}

/**
 * Saves a location as coordinates to the database.
 * @param {[type]} userId [description]
 * @param {[type]} location [description]
 */
function setLocation(userId, location) {
  return geocode(location).then(function (coord) {
    save(userId, coord);
  });
}