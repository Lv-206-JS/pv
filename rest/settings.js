'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project  = require('../mongoose').ProjectModel;

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get settings
router.get('/:pid/settings', function (request, response) {
        Project.find({'id': request.params.pid}, {'settings': 1}, function (err, settings) {
            if (!err) {
                response.send({ status: 'OK', settings:settings});
            } else {
                return handleError(response, err, "Failed to send settings!");
            }
        });
});

//add settings when project creating
router.post('/:pid/settings', function (request, response) {
    var settings = {
        "dayDuration" : request.body.dayDuration,
        "weekend" : request.body.weekend,
        "icon" : request.body.icon
    };
    Project.findOneAndUpdate({'id': request.params.pid}, {settings:settings}, function (err, project) {
        if (!err) {
            response.send({ status: 'OK', settings:project.settings});
        }
        else {
            handleError(response, err, "Failed to create settings!");
        }
    });
});

//update project
router.put('/:pid/settings', function (request, response) {
    var settings = {
        "dayDuration" : request.body.dayDuration,
        "weekend" : request.body.weekend,
        "icon" : request.body.icon
    };
    Project.findOneAndUpdate({'id': request.params.pid}, {settings:settings}, function (err, project) {
        if (!err) {
            response.send({ status: 'OK', settings:project.settings});
        }
        else {
            handleError(response, err, "Failed to create settings!");
        }
    });
});

module.exports = router;