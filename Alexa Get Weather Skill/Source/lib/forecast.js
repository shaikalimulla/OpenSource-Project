'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _forecastio = require('forecastio');

var _forecastio2 = _interopRequireDefault(_forecastio);

var _location = require('./location.js');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _dotenv2.default.config();
var forecastIo = new _forecastio2.default(config.API_KEY);

exports.default = _co2.default.wrap(_regenerator2.default.mark(function _callee(userId, place) {
  var coord, forecast, currently, temp, feelsLike;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _location2.default.getLocation(userId, place);

        case 3:
          coord = _context.sent;
          _context.next = 6;
          return forecastIo.forecast(coord.lat, coord.lng);

        case 6:
          forecast = _context.sent;
          currently = forecast.currently;
          temp = Math.round(currently.temperature);
          feelsLike = Math.round(currently.apparentTemperature);
          return _context.abrupt('return', _bluebird2.default.resolve({
            temp: {
              speech: 'It\'s currently ' + temp + ' degrees.',
              value: temp
            },
            feelsLike: feelsLike && Math.abs(feelsLike - temp) > config.FEELS_LIKE_THRESHOLD && {
              speech: 'Feels like ' + feelsLike + ' degrees.',
              value: feelsLike
            },
            hourSummary: forecast.minutely.summary,
            daySummary: forecast.hourly.summary,
            weekSummary: forecast.daily.summary
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context['catch'](0);
          return _context.abrupt('return', _bluebird2.default.reject('No location saved.'));

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 13]]);
}));