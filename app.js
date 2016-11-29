'use strict';

var express = require('express');

//modules required for authentication
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');


//mongoose connection
var morgan = require('morgan');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect("localhost:27017/ganttcharts");

var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');


var app = express();
var projectAPI = require('./rest/routes/projects');
var attachmentsAPI = require('./rest/routes/attachments');

//routes
var routes = require('./rest/routes/index');


var passport = require('passport');
var users = require('./rest/routes/users');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// loading routes for authentication
// var index = require('./rest/index');
var userAPI = require('./rest/routes/user');


//View Engine
app.set('views', path.join(__dirname, 'views'));//folder views handles our views
//app.engine('handlebars', exphbs({defaultLayout: 'layout'}));//setting engine and default layout
app.set('view engine', 'ejs');

//Logger
app.use(morgan('dev'));

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set Static folder(src folder);
//stuff that is publicly accessible to the browser
app.use(express.static(path.join(__dirname, 'public')));



app.use('/rest/user', userAPI);
app.use('/rest/projects', projectAPI);
app.use('/rest/projects', attachmentsAPI);

// Passport Initialization
//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

var authenticateUser = function(req, res, next){
    console.log("req");
    console.log(req.isAuthenticated());
    console.log("req");
    // if(req.isAuthenticated()){
    //     console.log("thats good");
    //     return next();
    // } else {
    //     //req.flash('error_msg', 'You are not logged in');
    //     console.log('Not authorized');
    //     res.redirect('users/login');
    //     //return next();
    // }
    if (req.user) {
        console.log("AUTHORIZED!")
    }else{
        console.log("NOT AUTHORIZED");
    }
    console.log(req);
    return req.isAuthenticated() ? next() : redirect("users/login");
}
app.all('rest/projects', authenticateUser);
app.all('rest/projects/*', authenticateUser);


















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

//app.use('/', routes);
app.use('/users', users);

app.use(/\/project.*/, express.static('./index.html'));
app.use(/\/user.*/, express.static('./index.html'));
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