var noaaForecaster = require('noaa-forecasts');
var moment = require('moment');
var inspect = require('util').inspect;
const config = require('../config');

module.exports.getNOAAForecast = function getNOAAForecast(req, res, next) {
  const data = req.body;

    var obj = {
    listLatLon: '38.99,-77.01 37.7833,-122.4167',
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


  noaaForecaster.setToken(config.keys.NOAA_WEATHER_API_KEY);
  noaaForecaster.getForecast(obj)
    .then(function(results) {
      console.log(inspect(results, { colors: true, depth: Infinity }));
      res.status(200).json({
        message: results
      });
      next(results);

    });

  }
