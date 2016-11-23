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



//routes
var routes = require('./rest/routes/index');
var users = require('./rest/routes/users');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/rest/projects', projectAPI);
app.use('/rest/settings', settingsAPI);
app.use('/rest/tasks',  taskAPI);







//View Engine
app.set('views', path.join(__dirname, 'views'));//folder views handles our views
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));//setting engine and default layout
app.set('view engine', 'handlebars');

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set Static folder(src folder);
//stuff that is publicly accessible to the browser
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//Express Validator code taken from express-validator github
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

//Connect Flash MiddleWare
app.use(flash());

//Global Variables For Flash Messages
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  //passpport own flash error messages
  res.locals.error = req.flash('error');
  res.locals.current_user = req.user || null
  next();
});






app.use('/', routes);
app.use('/users', users);


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
