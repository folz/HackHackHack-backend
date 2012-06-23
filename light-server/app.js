
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/console', function(req,res){
  code = req.params.code;
  error = req.params.error;
  if(error) {
    console.log(error);
    res.send("There was an error. See server logs");
  }
  if(code){
    console.log("Alright, got some auth code from singly. Gonna do an oauth post now.");
    http.request( {
                    host:"https://api.singly.com"
                  , path:"/oauth/access_token"
                  , method:"POST"
                  , client_id:""
                  , client_secret:""
                  , code:code
                  },function(res){
                  // what do we do with the response??
                  });

  }
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
