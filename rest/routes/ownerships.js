var express = require('express');
var router = express.Router();
var Ownerships  = require('../../mongoose').OwnershipsModel;
var Users  = require('../../mongoose').UsersModel;

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.send(401);
    }
}

function getProjectId() {
    var projectReference = request.headers.referer;
    var lastSlash = projectReference.lastIndexOf("/");
    var projectId = projectReference.slice(lastSlash+1);
    return projectId;
}

router.get('/', authenticateUser, function (request, response) {
    Ownerships.find({'projectId': getProjectId()}, function (err, ownerShip) {
        if(!ownerShip || err) {
            handleError(response, "Failed to find ownerShip!", 404);
        }
        else {
            response.send(ownerShip);
        }
    });
});

router.post('/:email/:role', authenticateUser, function (request, response) {
    var uid;
    Users.findOne({'email': request.params.email}, function (err, user) {
        if(err) {
            handleError(response, "Failed to find user!", 404);
        }
        else {
            uid = user.userId;
        }
    }).then(function () {
        var ownerShipToCreate = new Ownerships({
            projectId: getProjectId(),
            userId: uid,
            role: request.params.role
        });
        ownerShipToCreate.save(function (err, ownerShip) {
            if (err) {
                handleError(response, "Failed to save ownerShip!", 404);
            }
            else {
                response.send(ownerShip);
            }
        })
    });

});

router.delete('/:email', authenticateUser, function (request, response) {
    var uid;
    Users.findOne({'email': request.params.email}, function (err, user) {
        if(err) {
            handleError(response, "Failed to find user!", 404);
        }
        else {
            uid = user.userId;
        }
    }).then(function () {
        Ownerships.findOneAndRemove({
            'projectId': getProjectId(),
            'userId': uid
        }, function (err, ownerShip) {
            if (!ownerShip) {
                handleError(response, "Failed to find ownerShip!", 404);
            }
            else if (err) {
                handleError(response, "Failed to delete ownerShip!", 404);
            }
            else {
                response.send('Deleted!');
            }
        })
    });
});

module.exports = router;