var express = require('express');
var router = express.Router();
var Guid = require('guid');

//setting passport module
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//setting user from a model
var User = require('../models/user');

//Register user
router.post('/register', function (req, res) {
    console.log("REGISTER");

    var userId = Guid.create().value;
    var firstname = req.body.firstname;
    var email = req.body.email;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validation
    req.checkBody('firstname', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('lastname', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();

    return User.findOne({email: email}, function (error, findedEmail) {
        if (findedEmail != undefined) {
            errors = errors || [];
            errors.push({param: 'email', msg: 'Email already exists', value: ''});
            return res.status(200).json(JSON.stringify({"error": errors}));
        }
        else {
            var newUser = new User({
                userId: userId,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            });

            User.createUser(newUser, function (err, user) {
                if (err) throw err;
            });
            return res.status(201).json(JSON.stringify({"error": errors}));
        }
    });
});

//passport-local configuration
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

//serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserialize user
passport.deserializeUser(function (id, done) {

    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

var fn = passport.authenticate('local', {
    successRedirect: '/projects',
    failureRedirect: 'users/login'
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('Unknown user');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.send(user);
        });
    })(req, res, next);
});

//Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.send(200, 'You are logged out');
});

module.exports = router;
