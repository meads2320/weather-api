const express = require('express');
const noaaApi = require('../NOAA/api');
const darkSkyApi = require('../DarkSky/api');
const msnApi = require('../MSN/api');
const yahooApi = require('../Yahoo/api');
const openWeatherApi = require('../OpenWeather/api');

const router = new express.Router();

router.get('/getNOAAForecast', noaaApi.getNOAAForecast);
router.get('/getDarkSkyForecast', darkSkyApi.getDarkSkyForecast);
router.get('/getMSNForecast', msnApi.getMSNForecast);
router.get('/getYahooForecast', yahooApi.getYahooForecast);
router.get('/getOpenWeatherForecast', openWeatherApi.getOpenWeatherForecast);

module.exports = router;
