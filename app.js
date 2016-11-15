var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var helloAPI = require('./src/routes/hello');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

app.use('/rest/hello', helloAPI);
app.use(express.static(__dirname));


var port = process.env.PORT || 9090; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


app.listen(port);
console.log('Magic happens at http://localhost:' + port);








