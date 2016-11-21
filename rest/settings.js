'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var projStub = require('./stubs/projectsStub.json');

var findProjectById = function (projId) {
    var project;
    for (var i = 0, len = projStub.length; i < len; i++) {
        if(projStub[i].id == projId) {
            project = projStub[i];
            return project;
        }
    }
    return false;
};

//get settings
router.route('/:pid/settings')
    .get(function (request, response) {
        var settStubCopy = findProjectById(request.params.pid).settings;
        if (!settStubCopy) {
            response.sendStatus(404);
        }
        response.send(settStubCopy);
    })

//add settings when project creating
    .post(jsonParser, function (request, response) {
        var settStubCopy = findProjectById(request.params.pid);
        if (!settStubCopy) {
            response.sendStatus(404);
        }
        settStubCopy.settings = {
            "dayDuration": request.body.dayDuration,
            "weekend": request.body.weekend,
            "icon": request.body.icon
        };
        response.send(settStubCopy.settings);
    })

//update project
    .put(jsonParser, function (request, response) {
        var settStubCopy = findProjectById(request.params.pid).settings;
        if (!settStubCopy) {
            response.sendStatus(404);
        }
        settStubCopy.dayDuration = request.body.dayDuration;
        settStubCopy.weekend = request.body.weekend;
        settStubCopy.icon = request.body.icon;
        response.send(settStubCopy);
    });

module.exports = router;