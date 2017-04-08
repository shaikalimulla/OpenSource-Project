'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = alexaCoWrap;

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Works like the co.wrap function but instead of returning a Promise it returns false so that
 * Alexa knows to wait for a response.
 * @param {Function} fn
 * @returns {Boolean} false
 */
function alexaCoWrap(fn) {
  createResponse.__generatorFunction__ = fn;
  return createResponse;

  function createResponse() {
    _co2.default.call(this, fn.apply(this, arguments));
    return false;
  }
}