'use strict';

var express = require('express');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

//get settings
router.get('/:pid', function (request, response) {
    Project.findOne({'id': request.params.pid}, {'settings': 1}, function (err, settings) {
        if(!settings) {
            return handleError(response, "Failed to find settings!", 404);
        }
        if (!err) {
            response.send(settings.settings);
        } else {
            return handleError(response, "Failed to send settings!");
        }
    });
});

//update settings
router.put('/:pid', function (request, response) {
    var settings = {
        "dayDuration" : request.body.dayDuration,
        "weekend" : request.body.weekend,
        "icon" : request.body.icon
    };
    Project.findOneAndUpdate({'id': request.params.pid}, {settings:settings}, {new:true}, function (err, project) {
        if(!project) {
            return handleError(response, "Failed to find settings!", 200);
        }
        if (!err) {
            response.send(project.settings);
        }
        else {
            handleError(response, "Failed to create settings!");
        }
    });
});

module.exports = router;