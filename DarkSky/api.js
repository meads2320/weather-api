var Forecast = require('forecast');
var moment = require('moment');
var inspect = require('util').inspect;
const config = require('../config');

// Initialize
var forecast = new Forecast({
  service: 'darksky',
  key: config.keys.DARK_SKY_WEATHER_API_KEY,
  units: 'fahrenheit',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 10,
    seconds: 0
  }
});

module.exports.getDarkSkyForecast = function getDarkSkyForecast(req, res, next) {
  const data = req.query;

  if(!data || !data.lat || !data.lon) {
    const err = "Incorrect Lat/ Lon params";
    res.status(400).json({
      message: err
    });
    next(err);
    return;
  }

  forecast.get([data.lat, data.lon], function(err, weather) {
      if(err) {
        res.status(400).json({
          message: err
        });
        next(err);
      }
      else {
        res.status(200).json({
          message: weather
        });
        next(weather);
      }
    });
};
