'use strict';

var express = require('express');

//modules required for authentication
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();
var helloAPI = require('./rest/hello');
var projectAPI = require('./rest/projects');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// loading routes for authentication
var index = require('./rest/index');
var user = require('./rest/user');
var login = require('./rest/authorization/login');
var signup = require('./rest/authorization/signup');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : "MONTANA",
    saveUninitialized: true,
    resave : false
}));


app.use('/rest/hello', helloAPI);
app.use('/rest/projects', projectAPI);


// attaching authentication routes to the application
app.use(index);
app.use(login);
app.use(signup);
app.use(user);


app.use(/\/project.*/, express.static('./index.html'));
app.use(express.static(__dirname));

app.listen(9090);