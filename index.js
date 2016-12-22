const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
var app = express();

var port = process.env.PORT || 7412;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('<a target="_blank" href="/v1/getDarkSkyForecast?lat=28.0&lon=-81.0">Dark Sky Weather</a><br/>' +
  '<a target="_blank" href="/v1/getMSNForecast?location=33626">MSN Weather with Zip Code</a><br/>' +
  '<a target="_blank" href="/v1/getMSNForecast?location=Tampa, FL">MSN Weather with City, State</a><br/>' +
  '<a target="_blank" href="/v1/getNOAAForecast?lat=28.0&lon=-81.0">NOAA Weather</a><br/>' +
  '<a target="_blank" href="/v1/getYahooForecast?location=Tampa, FL">Yahoo Weather</a><br/>' +
  '<a target="_blank" href="/v1/getOpenWeatherForecast?location=Tampa, FL">OpenWeather Weather By City</a><br/>' +
  '<a target="_blank" href="/v1/getOpenWeatherForecastByCoordinates?lat=28.0&lon=-81.0">OpenWeather Weather By Coordinates</a><br/>'
  );
})

app.use('/v1', routes);

app.listen(port);
console.log('listening on port ' + port);
