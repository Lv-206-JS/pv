'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// get projects collection
var stub = require('./stubs/projectsStub.json');
// create empty obj for current project
var stubProj;
// create empty obj for current task
var stubTask;
/*
 * will be used when we will start use db`es
 * var MongoClient = require('mongodb').MongoClient;
 * var url = 'mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts';
 */

var findProjectById = function (projId) {
    var project;
    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == projId) {
            project = stub[i];
            return project;
        }
    }
};

var findTaskById = function (taskId) {
    var task;
    for (var i = 0, len = stubProj.tasks.length; i <len; i++) {
        if (stubProj.tasks[i].taskId == taskId) {
            task = stubProj.tasks[i];
            return task;
        }
    }
};


//get all tasks
router.get('/:pid/tasks/', function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if(stubProj) {
        response.send(stubProj.tasks);
    }
    else {
        response.sendStatus(404);
    }
});

//get one task
router.get('/:pid/tasks/:tid', function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (stubProj) {
        stubTask = findTaskById(request.params.tid);
        if (stubTask) {
            response.send(stubTask);
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(404);
    }
});

// create task
router.post('/:pid/tasks/', jsonParser, function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (stubProj) {
        stubProj.tasks.push({
            "taskId": 3,
            "projectId": request.params.pid,
            "name": "task3",
            "description": "This is super cool tasks.",
            "estimateTime": 4,
            "resource": "Developer 10",
            "dependsOn": [
                {
                    "taskId": false,
                    "type": false
                }
            ],
            "attachments": [
                {
                    "attachmentId": "a1",
                    "fileName": "blah.jpeg",
                    "mimetype": "image/jpeg"
                }
            ]
        });
        var length = stubProj.tasks.length;
        response.send(stubProj.tasks[length - 1]);
    } else {
        response.sendStatus(404);
    }
});

// update task
router.put('/:pid/tasks/:tid', jsonParser, function (request, response) {
    if (request.body) {
        stubProj = findProjectById(request.params.pid);
        if (stubProj) {
            stubTask = findTaskById(request.params.tid);
            if (stubTask) {
                stubTask = {
                    "taskId": request.params.tid,
                    "projectId": request.params.pid,
                    "name": request.body.name,
                    "description": request.body.description,
                    "estimateTime": request.body.estimateTime,
                    "resource": request.body.resource,
                    "dependsOn": [
                        {
                            "taskId": request.body.dependsOn[0].taskId,
                            "type": request.body.dependsOn[0].type
                        }
                    ],
                    "attachments": [
                        {
                            "attachmentId": request.body.attachments[0].attachmentId,
                            "fileName": request.body.attachments[0].fileName,
                            "mimetype": request.body.attachments[0].mimetype
                        }
                    ]
                };
                response.send(stubTask);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(404);
    }
});

// delete task
router.delete('/:pid/tasks/:tid', function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (stubProj) {
        for (var i = 0, len = stubProj.tasks.length; i <len; i++) {
            if (stubProj.tasks[i].taskId == request.params.tid) {
                stubTask = stubProj.tasks[i];
                break;
            }
        }
        if (stubTask) {
            stubProj.tasks.splice(i, 1);
            response.send(stubProj.tasks);
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(404);
    }
});

module.exports = router;