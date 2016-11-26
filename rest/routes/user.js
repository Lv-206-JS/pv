
var express = require('express');
var router = express.Router();
var User  = require('../../mongoose').UsersModel;

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get one user
router.get('/:id', function (request, response) {
    User.findOne({'userId': request.params.id}, function (err, user) {
        if (!user) {
            return handleError(response, err, "Failed to find user!", 404);
        }
        if (!err) {
            response.send(user);
        } else {
            return handleError(response, err, "Failed to send user!");
        }
    });
});

module.exports = router;