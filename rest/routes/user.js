var express = require('express');
var router = express.Router();
var User  = require('../../mongoose').UsersModel;

function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.send(401);
    }
}

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get one user for dispaying
router.get('/', authenticateUser, function (request, response) {
    User.findOne({'userId': request.user.userId}, function (err, user) {
        if (!user) {
            return handleError(response, err, "Failed to find user!", 404);
        }
        if (!err) {
            response.send({
                "userId": user.userId,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email
            });
        } else {
            return handleError(response, err, "Failed to send user!");
        }
    });
});

module.exports = router;