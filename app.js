/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/some', routes.some);
app.get('/navigation', routes.navigation);
app.get('/links', routes.links);


// app.listen(5000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});