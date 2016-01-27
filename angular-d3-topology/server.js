var express   = require('express'),
    path      = require('path'),
    bodyParser= require('body-parser'),
    app       = express(),
    logger    = require('./server/config/logger')


app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use(require("morgan")("tiny", {
  "stream": logger.stream
}));


var server = app.listen(9007, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./server/config/routes')(app);
