'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _alexaCowrap = require('./alexa-cowrap.js');

var _alexaCowrap2 = _interopRequireDefault(_alexaCowrap);

var _forecast = require('./forecast.js');

var _forecast2 = _interopRequireDefault(_forecast);

var _location = require('./location.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = {};

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleLaunchIntent = function (request, response) {};

_exports.handleLocationIntent = (0, _alexaCowrap2.default)(_regenerator2.default.mark(function _callee(request, response) {
  var fn;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _location.setLocation)(request.sessionDetails.userId, request.slot('location'));

        case 2:

          response.say('Location saved!');

          if (request.session('originalRequestData')) {
            fn = _exports['handle' + request.session('originalRequestData').name];

            if (fn) {
              response.say('In ' + request.slot('location'));
              fn(request, response);
            } else {
              response.send();
            }
          } else {
            response.send();
          }

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleForecast = (0, _alexaCowrap2.default)(_regenerator2.default.mark(function _callee2(request, response) {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _forecast2.default)(request.sessionDetails.userId, request.slot('location')).catch(function (reason) {
            response.shouldEndSession(false).session('originalRequestData', request.data.request.intent).say('You need to save your location first.').say('For example, you could say "my location is Brooklyn New York".').send();
            return _bluebird2.default.reject();
          }).then(function (data) {
            response.say(data.temp.speech).say(data.feelsLike.speech).say(data.hourSummary).say(data.daySummary).send();
          });

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleNowForecast = (0, _alexaCowrap2.default)(_regenerator2.default.mark(function _callee3(request, response) {
  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _forecast2.default.fetch(request.sessionDetails.userId, request.slot('location')).catch(function () {
            response.send();
            return _bluebird2.default.reject();
          }).then(function (data) {
            response.say(data.temp.speech).say(data.feelsLike.speech).say(data.hourSummary).send();
          });

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleDayForecast = (0, _alexaCowrap2.default)(_regenerator2.default.mark(function _callee4(request, response) {
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _forecast2.default.fetch(request.sessionDetails.userId, request.slot('location')).catch(function () {
            response.send();
            return _bluebird2.default.reject();
          }).then(function (data) {
            response.say(data.daySummary).send();
          });

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleWeekForecast = (0, _alexaCowrap2.default)(_regenerator2.default.mark(function _callee5(request, response) {
  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _forecast2.default.fetch(request.sessionDetails.userId, request.slot('location')).catch(function () {
            response.send();
            return _bluebird2.default.reject();
          }).then(function (data) {
            response.say(data.weekSummary).send();
          });

        case 1:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, this);
}));

/**
 * Handles requests for help with the skill.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
_exports.handleHelpIntent = function (request, response) {};

exports.default = _exports;