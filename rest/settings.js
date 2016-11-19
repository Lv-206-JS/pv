'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var projStub = require('./projectsStub.json');

//get settings
router.get('/:pid/settings', function (request, response) {
    var settStubCopy;
    for (var i = 0, len = projStub.length; i < len; i++) {
        if(projStub[i].id == request.params.pid) {
            settStubCopy = projStub[i].settings;
        }
    }
    response.send(settStubCopy);
});

//add settings when project creating
router.post('/:pid/settings', jsonParser, function (request, response) {
    var settStubCopy;
    for (var i = 0, len = projStub.length; i < len; i++) {
        if(projStub[i].id == request.params.pid) {
            settStubCopy = projStub[i];
        }
    }
    settStubCopy.settings = {
        "dayDuration": request.body.dayDuration,
        "weekend": request.body.weekend,
        "icon": request.body.icon
    };
    response.send(settStubCopy.settings);
});

//update project
router.put('/:pid/settings', jsonParser, function (request, response) {
    var settStubCopy;
    for (var i = 0, len = projStub.length; i < len; i++) {
        if(projStub[i].id == request.params.pid) {
            settStubCopy = projStub[i].settings;
        }
    }
    settStubCopy.dayDuration = request.body.dayDuration;
    settStubCopy.weekend = request.body.weekend;
    settStubCopy.icon = request.body.icon;
    response.send(settStubCopy);
});

module.exports = router;