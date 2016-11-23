'use strict';

var express = require('express');

//modules required for authentication
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect("localhost:27017/ganttcharts");

var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = mongoose.connection;


var app = express();
var projectAPI = require('./rest/routes/projects');
var settingsAPI = require('./rest/routes/settings');
var taskAPI = require('./rest/routes/tasks');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/rest/projects', projectAPI);
app.use('/rest/settings', settingsAPI);
app.use('/rest/tasks',  taskAPI);



app.use(/\/project.*/, express.static('./index.html'));
app.use(express.static(__dirname));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//exporting  app to fire www
module.exports = app;
