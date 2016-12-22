var Clima = require('node-clima');
var config = require('../config');

var clima = new Clima({
     format: 'json',    // required
   units: 'Fahrenheit',   // optional
   apikey: config.keys.OPEN_WEATHER_API_KEY
  });

module.exports.getOpenWeatherForecast = function getOpenWeatherForecast(req, res, next) {
  const data = req.query;
   console.log(data);
  if(!data || !data.location) {
    const err = "Incorrect Location Param";
    res.status(400).json({
      message: err
    });
    next(err);
    return;
  }

    clima.currentByCityName({
     cityName: data.location,
       callback: function(err, data) {
       next(data);
       console.log(data);
     }
   });

  }
