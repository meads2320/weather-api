var weather = require('yahoo-weather');


module.exports.getYahooForecast = function getYahooForecast(req, res, next) {
  const data = req.query;


  if(!data || !data.location) {
    const err = "Incorrect Location String";
    res.status(400).json({
      message: err
    });
    next(err);
    return;
  }


  weather(data.location, 'f').then(weather => {

      console.log(weather)
    res.status(200).json({
      message: weather
    });
    next(weather);

  }).catch(err => {
    res.status(400).json({
      message: err
    });
    next(err);
  });

};
