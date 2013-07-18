var application_root    = __dirname,
    express             = require('express'),
    path                = require('path'),
    http                = require('http');

var app = module.exports    = express(),
    server                  = http.createServer(app),
    io                      = require('socket.io').listen(server);


// Uncomment to fallback to long polling ajax.
// Useful for deploying to Heroku.

// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

// Standard server config
app.configure(function() {

    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Where to serve static content
    app.use(express.static(path.join(application_root, 'site')));

    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions  : true,
        showStack       : true
    }));

});


io.sockets.on('connection', function (socket) {
	// do socket stuff here.
});

// check / set port
var port = process.env.PORT || 3000;

// check for parent
if (!module.parent) {
  server.listen(port);
}
