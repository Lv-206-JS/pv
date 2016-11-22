'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*mongoose.connect("localhost:27017/ganttcharts");*/
var Project  = require('../mongoose').ProjectModel;

//functions for working with
function getDate() {
    return new Date();
}

function increaseIdCounter () {
    var biggestId = 0;
    Project.findOne().sort('-id').exec(function(err, project) {
        biggestId = project.id;
    });
    return ++biggestId;
}

var projectProjection = {
    milestones: false,
    settings: false,
    tasks: false
};

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get all projects
router.get('/', function (request, response) {
    Project.find({}, projectProjection, function (err, projects) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }
        response.send(projects);
    });
});

//create project
router.post('/', function (request, response) {
    var projectToCreate = new Project({
        "id": increaseIdCounter(),
        "name": request.body.name,
        "description": request.body.description,
        "author": request.body.author,
        "startDate": request.body.startDate,
        "createDate": getDate(),
        "modifiedDate": getDate()
    });
    projectToCreate.save(function (err, project) {
        if (err) {
            handleError(response, err, "Failed to create project!");
        }
        else {
            response.send({ status: 'OK', project:project});
        }
    });
});

//get one project
router.get('/:id', function (request, response) {
    Project.find({'id': request.params.id}, projectProjection, function (err, project) {
        if(project.length == 0) {
            return handleError(response, err, "Failed to find project!", 404);
        }
        if (!err) {
            response.send({ status: 'OK', project:project });
        } else {
            return handleError(response, err, "Failed to send project!");
        }
    });
});


//update project
router.route('/:id').put(function (request, response) {
        var projStubCopy = findProjectById(request.params.id);
        if (!projStubCopy) {
            response.sendStatus(404);
        }
        projStubCopy.name = request.body.name;
        projStubCopy.description = request.body.description;
        projStubCopy.author = request.body.author;
        projStubCopy.startDate = request.body.startDate;
        //on save will be changing <===== must be implement
        projStubCopy.modifiedDate = getDate();
        response.send(projStubCopy);
    })

//delete project
    .delete(function (request, response) {
        var projStubCopy = projStub;
        for (var i = 0, len = projStubCopy.length; i < len; i++) {
            if(projStubCopy[i].id == request.params.id) {
                break;
            }
        }
        if (!projStubCopy[i]) {
            response.sendStatus(404);
        }
        projStubCopy.splice(i,1);
        response.send(projStubCopy);
    });

module.exports = router;
