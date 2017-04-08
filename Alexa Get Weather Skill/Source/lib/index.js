'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alexaApp = require('alexa-app');

var _alexaApp2 = _interopRequireDefault(_alexaApp);

var _handlers = require('./handlers.js');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _alexaApp2.default.app();

app.launch(_handlers2.default.handleLaunchIntent);
app.intent('SetLocation', _handlers2.default.handleLocationIntent);
app.intent('Forecast', _handlers2.default.handleForecast);
app.intent('ForecastNow', _handlers2.default.handleNowForecast);
app.intent('ForecastDay', _handlers2.default.handleDayForecast);
app.intent('ForecastWeek', _handlers2.default.handleWeekForecast);
app.intent('AMAZON.HelpIntent', _handlers2.default.handleHelpIntent);

exports.default = app;