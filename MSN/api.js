var weather = require('weather-js');

module.exports.getMSNForecast = function getMSNForecast(req, res, next) {
  const data = req.query;

  if(!data || !data.location) {
    const err = "Incorrect Location String";
    res.status(400).json({
      message: err
    });
    next(err);
    return;
  }

  weather.find({search: data.location, degreeType: 'F'}, function(err, weather) {
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
