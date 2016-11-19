'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/*
 * will be used when we will start use db`es
 * var MongoClient = require('mongodb').MongoClient;
 * var url = 'mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts';
 */

//get all tasks
router.get('/:pid/tasks/', function (request, response) {
    // get projects collection
    var stub = require('./projectsStub.json');
    // create empty obj for current project
    var stubProj;
    // loop through projects to get current project obj
    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == request.params.pid) {
            stubProj = stub[i];
        }
    }
    if(stubProj) {
        response.send(stubProj.tasks);
    }
    else {
        res.sendStatus(404);
    }
});

//get one task
router.get('/:pid/tasks/:tid', function (request, response) {
    // get projects collection
    var stub = require('./projectsStub.json');
    // create empty obj for current project
    var stubProj, stubTask;
    // loop through projects to get current project obj
    for (var i = 0, len = stub.length; i < len; i++) {
        if (stub[i].id == request.params.pid) {
            stubProj = stub[i];
        }
    }
    if (!stubProj) {
        res.sendStatus(404);
    } else {
        // loop through tasks to get current task obj
        for (var i = 0, len = stubProj.tasks.length; i < len; i++) {
            if (stubProj.tasks[i].taskId == request.params.tid) {
                stubTask = stubProj.tasks[i];
            }
        }
        if (stubTask) {
            response.send(stubTask);
        } else {
            res.sendStatus(404);
        }
    }
});

// create task
router.post('/:pid/tasks/', jsonParser, function (request, response) {
    var stub = require('./projectsStub.json');
    var stubProj;
    // loop through projects to get current project obj
    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == request.params.pid) {
            stubProj = stub[i];
        }
    }
    if (!stubProj) {
        res.sendStatus(404);
    } else {
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
    }
});

// update task
router.put('/:pid/tasks/:tid', jsonParser, function (request, response) {
    if (!request.body) {
        var stub = require('./projectsStub.json');
        var stubProj, stubTask;
        // loop through projects to get current project obj
        for (var i = 0, len = stub.length; i < len; i++) {
            if (stub[i].id == request.params.pid) {
                stubProj = stub[i];
            }
        }
        if (!stubProj) {
            res.sendStatus(404);
        } else {
            // loop through tasks to get current task obj
            for (var i = 0, len = stubProj.tasks.length; i < len; i++) {
                if (stubProj.tasks[i].taskId == request.params.tid) {
                    stubTask = stubProj.tasks[i];
                }
            }
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
                res.sendStatus(404);
            }
        }
    } else {
        res.status(400).send('Empty request body!');
    }
});

// delete task
router.delete('/:pid/tasks/:tid', function (request, response) {
    var stub = require('./projectsStub.json');
    var stubProj;
    // loop through projects to get current project obj
    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == request.params.pid) {
            stubProj = stub[i];
        }
    }
    if (!stubProj) {
        res.sendStatus(404);
    } else {
        // loop through tasks to get current task obj
        for (var i = 0, len = stubProj.tasks.length; i < len; i++) {
            if(stubProj.tasks[i].taskId == request.params.tid) {
                break;
            }
        }
        if (stubTask) {
            stubProj.tasks.splice(i, 1);
            response.send(stubProj.tasks);
        } else {
            res.sendStatus(404);
        }
    }
});

module.exports = router;