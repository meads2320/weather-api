const nock = require('nock'); // eslint-disable-line
const assert = require('assert');
const sinon = require('sinon'); // eslint-disable-line
const httpMocks = require('node-mocks-http'); // eslint-disable-line
const noaaApi = require('../NOAA/api');
const darkSkyApi = require('../DarkSky/api');
const msnApi = require('../MSN/api');
const yahooApi = require('../Yahoo/api');
const openWeatherApi = require('../OpenWeather/api');

describe('Get Weather', () => {

  it('should get NOAA', (done) => {
    const req = httpMocks.createRequest({
      query: {
          lat: 28.0,
          lon: -82.0
        }
    });
    const res = httpMocks.createResponse();

    noaaApi.getNOAAForecast(req, res, (result) => {
      console.log('NOAA', result);
      done(assert(result.point1 != null));
    });
  });

  it('should stop at validation for NOAA', (done) => {
    const req = httpMocks.createRequest({
      query: {
        }
    });
    const res = httpMocks.createResponse();

    noaaApi.getNOAAForecast(req, res, (result) => {
      console.log('NOAA', result);
      done(assert(result === 'Incorrect Lat/ Lon params'));
    });
  });

  it('should get Yahoo', (done) => {
    const req = httpMocks.createRequest({
      query: {
          location: "Tampa, FL"
        }
    });
    const res = httpMocks.createResponse();

    yahooApi.getYahooForecast(req, res, (result) => {
      console.log('Yahoo', result);

      done(assert(result.title.includes('Tampa, FL')));
    });
  }).timeout(0);


  it('should stop at validation for Yahoo', (done) => {
    const req = httpMocks.createRequest({
      query: {

        }
    });
    const res = httpMocks.createResponse();

    yahooApi.getYahooForecast(req, res, (result) => {
      console.log('Yahoo', result);
      done(assert(result === 'Incorrect Location String'));
    });
  });

  it('should get MSN', (done) => {
    const req = httpMocks.createRequest({
      query: {
          location: "Tampa, FL"
        }
    });
    const res = httpMocks.createResponse();

    msnApi.getMSNForecast(req, res, (result) => {
      console.log('MSN', result);

      done(assert(result[0].location.name === 'Tampa, FL'));
    });
  });

  it('should get MSN with zipcode', (done) => {
    const req = httpMocks.createRequest({
      query: {
          location: "33626"
        }
    });
    const res = httpMocks.createResponse();

    msnApi.getMSNForecast(req, res, (result) => {
      console.log('MSN', result);

      done(assert(result[0].location.zipcode === '33626'));
    });
  });

  it('should stop at validation for MSN', (done) => {
    const req = httpMocks.createRequest({
      query: {

        }
    });
    const res = httpMocks.createResponse();

    msnApi.getMSNForecast(req, res, (result) => {
      console.log('MSN', result);
      done(assert(result === 'Incorrect Location String'));
    });
  });

  it('should get Dark Sky', (done) => {
    const req = httpMocks.createRequest({
      query: {
          lat: 28.0,
          lon: -82.0
        }
    });
    const res = httpMocks.createResponse();

    darkSkyApi.getDarkSkyForecast(req, res, (result) => {
      console.log('Dark Sky', result);
      done(assert(result.currently != null
        && result.minutely != null
        && result.hourly != null
        && result.daily != null
      ));
    });
  });

  it('should stop at validation for Dark Sky', (done) => {
    const req = httpMocks.createRequest({
      query: {

        }
    });
    const res = httpMocks.createResponse();

    darkSkyApi.getDarkSkyForecast(req, res, (result) => {
      console.log('Dark Sky', result);
      done(assert(result === 'Incorrect Lat/ Lon params'));
    });
  });

  it('should fail Dark Sky', (done) => {
    const req = httpMocks.createRequest({
      query: {
        lat: 'foo',
        lon: 'bar'
        }
    });
    const res = httpMocks.createResponse();

    darkSkyApi.getDarkSkyForecast(req, res, (result) => {
      done(assert(result.toString().includes('Error')));
    });
  });

  it('should get Open Weather', (done) => {
    const req = httpMocks.createRequest({
      query: {
          location: 'Tampa, FL'
        }
    });
    const res = httpMocks.createResponse();

    openWeatherApi.getOpenWeatherForecast(req, res, (result) => {
      console.log('Open Weather', result);
      done(assert(result != null));
    });
  });

  it('should stop at validation for Open Weather', (done) => {
    const req = httpMocks.createRequest({
      query: {

        }
    });
    const res = httpMocks.createResponse();

    openWeatherApi.getOpenWeatherForecast(req, res, (result) => {
      console.log('Open Weather', result);
      done(assert(result === 'Incorrect Location Param'));
    });
  });
});
