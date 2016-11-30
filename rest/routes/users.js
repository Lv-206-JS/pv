var express = require('express');
var router = express.Router();

//setting passport module
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//setting user from a model
var User = require('../models/user');

//Registration
router.get('/register', function(req, res){
    res.render('register');
});

//Login
router.get('/login', function(req, res){
    res.render('login');
});


//Register user
router.post('/register', function(req, res){
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

    if(errors){
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            firstname: firstname,
            email: email,
            lastname: lastname,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    }
});

//passport-local configuration
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown user'});
            };
            console.log(user);
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    console.log('is Match');
                    return done(null, user);
                }else{
                    console.log('is not Match');
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

//serialize user
passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    console.log("user");
    console.log(user);
    done(null, user.id);
});

//deserialize user
passport.deserializeUser(function(id, done) {
    console.log("de serializeUser");
    console.log("id:"+ id);

    User.getUserById(id, function(err, user) {
        console.log("user");
        console.log(user);
        done(err, user);
    });
});

//Login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/projects',
        failureRedirect: 'users/login',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    }
);


//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;