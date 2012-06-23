
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
	var http = require('http');
	var querystring = require('querystring');

	var post_data = querystring.stringify({
	      "client_id":"7fafda85f20c24466098d291fc23b92c"
	    , "client_secret":"2b8818ce59d77540098f31e763b9f312"
	    , "code":code
	});
	
    var postOptions = {
                    host:"https://api.singly.com"
                  , port: 443
				  , path:"/oauth/access_token"
                  , method:"POST"
				  , headers: {
				  		'Content-Type': 'application/json'
				  }
				};
		
	var post_req = http.request(post_options, function(res) {
	  res.setEncoding('utf8');
	    res.on('data', function (data) {
			    console.log('Response: ' + data);
				  });	

  	});

  	// write parameters to post body
 	post_req.write(post_data);
 		post_req.end();
  }
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
