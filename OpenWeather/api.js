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

  module.exports.getOpenWeatherForecastByCoordinates = function getOpenWeatherForecastByCoordinates(req, res, next) {
    const data = req.query;
     console.log(data);

     if(!data || !data.lat || !data.lon) {
       const err = "Incorrect Lat/ Lon params";
       res.status(400).json({
         message: err
       });
       next(err);
       return;
     }

     let coordinates = {
       lat: data.lat,
       lon: data.lon
     };

      clima.currentByCoordinates({
       coord: coordinates,
         callback: function(err, data) {
         next(data);
         console.log(data);
       }
     });

    }
