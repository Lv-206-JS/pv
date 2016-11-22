'use strict';

var express = require('express');

//modules required for authentication
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();
var helloAPI = require('./rest/routes/hello');
var projectAPI = require('./rest/routes/projects');
var settingsAPI = require('./rest/routes/settings');
var taskAPI = require('./rest/routes/tasks');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// loading routes for authentication
// var index = require('./rest/index');
var user = require('./rest/routes/user');
var login = require('./rest/routes/authorization/login');
var signup = require('./rest/routes/authorization/signup');

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

app.use('/rest/routes/projects', projectAPI);
app.use('/rest/routes/settings', settingsAPI);
app.use('/rest/routes/tasks',  taskAPI);

// attaching authentication routes to the application
// app.use(index);
app.use(login);
app.use(signup);
app.use(user);

app.use(/\/project.*/, express.static('./index.html'));
app.use(express.static(__dirname));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//exporting  app to fire www
module.exports = app;
app.listen(9090);

