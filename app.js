require('./db');

var express = require('express'),
  connect = require('connect'),
  errorHandler = require('errorhandler'),
  connectTimeout = require('connect-timeout'),
  busboy = require('connect-busboy'),
  methodOverride = require('method-override'),
  http = require('http'),
  path = require('path'),
  app = express(),
  notes = require('./server/notes');

// General app configuration
app.set('port', process.env.PORT || 5001);
app.engine('html', require('ejs').renderFile);
app.use(busboy());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/img', express.static(__dirname + '/app/img'));
app.use('/lib', express.static(__dirname + '/bower_components'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

// Define the different routes we support
app.route('/')
  .get(function (req, res) {
    res.render('../app/index.html');
  });

app.route('/notes/:id')
  .get(notes.getNote);

app.route('/notes')
  .get(notes.get)
  .post(notes.addNote);

// Indicate any other api requests are not implemented
app.all('/v1/*', function (req, res, next) {
  res.writeHead(501);
  res.end();
});

// app.all('/*', loadUser);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});