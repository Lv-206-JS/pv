'use strict';

var express = require('express');

//modules required for authentication
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect(DATABASE_URL);

var MongoStore = require('connect-mongo')(session);

var app = express();
//routes
var projectAPI = require('./rest/routes/projects');
var attachmentsAPI = require('./rest/routes/attachments');
var ownershipAPI = require('./rest/routes/ownerships');
var routes = require('./rest/routes/index');
var userAPI = require('./rest/routes/user');
var passport = require('passport');
var users = require('./rest/routes/users');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
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
//set ejs as default engiene
app.set('view engine', 'ejs');



app.use(session({
    saveUninitialized: true,
    resave: true,
    maxAge: new Date(Date.now() + 3600000),
    secret: 'secret',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session'
    })
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/rest/user', userAPI);
app.use('/rest/projects', projectAPI);
app.use('/rest/attachments', attachmentsAPI);
app.use('/rest/ownerships', ownershipAPI);
app.use('/rest/user', userAPI);

app.use('/users', users);


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


app.use(/\/user.*/, express.static('./index.html'));
app.use(/\/login.*/, express.static('./index.html'));
app.use(/\/project.*/, express.static('./index.html'));
// app.use(/\/projects.*/, express.static('./index.html'));
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