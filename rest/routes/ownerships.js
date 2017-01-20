var express = require('express');
var router = express.Router();
var Ownerships  = require('../../mongoose').OwnershipsModel;
var Users  = require('../../mongoose').UsersModel;

//Error handler function
function handleError(response, error, code) {
    response.status(code || 500).json({"error": error});
}

function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return handleError(response, 'User is not authenticate!', 401);
    }
}

function getProjectId(request) {
    var projectReference = request.headers.referer;
    var lastSlash = projectReference.lastIndexOf("/");
    return projectReference.slice(lastSlash+1);
}

function checkOwnership(request, response, next) {
    Ownerships.findOne({'projectId': getProjectId(request), 'email': request.user.email}, function (err, ownerShip) {
        if(err) {
            return handleError(response, err.message, err.code);
        }
        else if(ownerShip != undefined) {
            if(ownerShip.role === 'creator') {
                next();
            }
            else {
                return response.send({access: 'Denied!'});
            }
        }
    });
}

router.get('/', authenticateUser, checkOwnership, function (request, response) {
    Ownerships.find({'projectId': getProjectId(request)}, function (err, ownerShips) {
        if(!ownerShips || err) {
            handleError(response, "Failed to find ownerShip!", 404);
        }
        else {
            response.send(ownerShips);
        }
    });
});

router.post('/', authenticateUser, checkOwnership, function (request, response) {
    var errors = [];

    //check is there email
    if(request.body.email == '') {
        errors.push('Email is not defined!');
    }
    //check is email registered
    Users.findOne({'email': request.body.email}, function (err, user) {
        if(err || !user) {
            errors.push('Can`t find user!')
        }
    }).then(function () {
    //check is email uniq for this ownership
        return Ownerships.findOne({'projectId': getProjectId(request),
            'email': request.body.email
        }, function (err, ownership) {
                if(ownership) {
                    errors.push('User already have ownership!');
                }
        });
    }).then(function () {
        //response errors if any
        if(errors.length) {
            return handleError(response, errors, 200);
        }
        var ownerShipToCreate = new Ownerships({
            projectId: request.body.projectId,
            email: request.body.email,
            role: request.body.role
        });
        ownerShipToCreate.save(function (err, ownerShip) {
            if (err) {
                handleError(response, "Failed to save ownerShip!", 404);
            }
            else {
                response.status(200).json(JSON.stringify({"ownerShip": ownerShip}));
            }
        });
    });
});

router.delete('/:email', authenticateUser, checkOwnership, function (request, response) {
    var errors = [];

    //check is there email
    if(request.body.email == '') {
        errors.push('Email is not defined!')
    }

    //check is email have an ownership
    Ownerships.findOne({'projectId': getProjectId(request),
        'email': request.params.email
    }, function (err, ownership) {
        if(err || !ownership) {
            errors.push('User don`t have this ownership!')
        }

    }).then(function () {

        //response errors if any
        if(errors.length) {
            return handleError(response, errors, 200);
        }
        Ownerships.findOneAndRemove({
            'projectId': getProjectId(request),
            'email': request.params.email
        }, function (err, ownerShip) {
            if (!ownerShip) {
                handleError(response, "Failed to find ownerShip!", 404);
            }
            else if (err) {
                handleError(response, "Failed to delete ownerShip!", 404);
            }
            else {
                response.send({status: 200});
            }
        });
    });
});

module.exports = router;