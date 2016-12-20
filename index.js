const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
var app = express();

var port = process.env.PORT || 7412;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/v1', routes);

app.listen(port);
console.log('listening on port ' + port);
