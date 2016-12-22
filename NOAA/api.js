var noaaForecaster = require('noaa-forecasts');
var moment = require('moment');
var inspect = require('util').inspect;
var config = require('../config');

noaaForecaster.setToken(config.keys.NOAA_WEATHER_API_KEY);

module.exports.getNOAAForecast = function getNOAAForecast(req, res, next) {
  const data = req.query;

  if(!data || !data.lat || !data.lon) {
    const err = "Incorrect Lat/ Lon params";
    res.status(400).json({
      message: err
    });
    next(err);
    return;
  }


    var obj = {
    lat: data.lat,
    lon: data.lon,
    product: 'time-series', // this is a default, it's not actually required
    begin: moment().format('YYYY-MM-DDTHH:mm:ss'),
    end: moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:ss'),
    qpf: 'qpf', // first elementInputName - Liquid Precipitation Amount
    pop12: 'pop12', // another elementInputName - 12 hour probability of precipitation,
    appt: 'appt',
    maxt: 'maxt',
    mint: 'mint',
    temp: 'temp',
    dew: 'dew',
    snow: 'snow',
    sky: 'sky',
    rh: 'rh',
    wspd: 'wspd',
    wdir: 'wdir',
    wx: 'wx',
    conhazo: 'conhazo'
  };



  noaaForecaster.getForecast(obj)
    .then(function(results) {

      console.log(inspect(results, { colors: true, depth: Infinity }));
      res.status(200).json({
        message: results
      });
      next(results);

    });

  }
