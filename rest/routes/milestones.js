'use strict';
var express = require('express');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;


var projectProjection = {
    settings: false,
    tasks: false
};

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get all milestones
router.get('/:pid', function (request, response) {
    Project.find({'id': request.params.pid}, {'milestones': 1}, function (err, milestones) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }
        response.send({ status: 'OK', milestones:milestones});
    });
});

//get one milestone
router.get('/:pid/:name', function (request, response) {
    var singleMilestone;
    Project.find({id: request.params.pid, 'milestones.name' : request.params.name}, function (err, milestone) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }

        // var len = milestones.milestones.length;
        // for(var i = 0; i<len;i++) {
        //     if (milestones.milestones[i].name == request.params.name)
        //         singleMilestone = milestones.milestones[i];
        // }
        response.send({status: 'OK', singleMilestone: milestone});

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
router.put('/:id', function (request, response) {
    var newName = request.body.name,
        newDescription = request.body.description,
        newAuthor = request.body.author,
        newStartDate = request.body.startDate,
        newModifiedDate = getDate();
    Project.findOneAndUpdate({'id': request.params.id}, {$set:{ name : newName, description : newDescription,
        author : newAuthor, startDate : newStartDate, modifiedDate : newModifiedDate} }, { new: true }, function (err, project) {
        if (!err) {
            response.send({ status: 'OK', project:project});
        }
        else {
            handleError(response, err, "Failed to create settings!");
        }
    });
});

//delete project
router.delete('/:id',function (request, response) {
    Project.findOneAndRemove({'id': request.params.id}, function (err, project) {
        if (!err) {
            response.send({ status: 'OK'});
        }
        else {
            handleError(response, err, "Failed to create settings!");
        }
    });
});

module.exports = router;
