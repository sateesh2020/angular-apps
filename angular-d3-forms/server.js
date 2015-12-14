var express   = require('express'),
    path      = require('path'),
    bodyParser= require('body-parser'),
    app       = express(),
    mongoose  = require('mongoose'),
    logger    = require('./server/config/logger'),
    dbName    = 'forms',
    dbUrl     = 'mongodb://127.0.0.1:27017/'+dbName;


/****************
Connecting to DB
*****************/
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', function(error) {
  logger.error('Connection Not Established')
});
db.once('open', function(callback) {
  logger.log('info', 'Connected to DB @ ' + dbUrl);
});
mongoose.set('debug', function(coll, method, query, doc) {
  logger.log('info', method, query);
});

app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use(require("morgan")("tiny", {
  "stream": logger.stream
}));


var server = app.listen(9617, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./server/config/routes')(app);
