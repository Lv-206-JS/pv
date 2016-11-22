
var express = require('express');
var router = express.Router();
var usersStub = require('../stubs/usersStub');

router.get('/:id', function(req, res, next) {
  // if(!req.session.user) return res.redirect('/login');
  // if(req.session.user.id == req.params.id ) return res.render('profile', req.session.user);
  var user = findUserById(req.params.id);
  if(!user)
    return next();
  res.send(user);
});

var findUserById = function (userId) {
    var user;
    for (var i = 0, len = usersStub.length; i < len; i++) {
        if(usersStub[i].id == userId) {
            user = usersStub[i];
            return user;
        }
    }
    return null;
};



module.exports = router;