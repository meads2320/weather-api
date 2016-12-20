const express = require('express');
const noaaApi = require('../NOAA/api');
const darkSkyApi = require('../DarkSky/api');

const router = new express.Router();

router.get('/getNOAAForecast', noaaApi.getNOAAForecast);
router.get('/getDarkSkyForecast', darkSkyApi.getDarkSkyForecast);

module.exports = router;
