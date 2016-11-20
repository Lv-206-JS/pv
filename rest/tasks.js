'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var stub = require('./stubs/projectsStub.json');
var stubProj, stubTask;

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
    return false;
};

var findTaskById = function (taskId) {
    var task;
    for (var i = 0, len = stubProj.tasks.length; i <len; i++) {
        if (stubProj.tasks[i].taskId == taskId) {
            task = stubProj.tasks[i];
            return task;
        }
    }
    return false;
};

router.route('/:pid/tasks/')
    .post(jsonParser, function (request, response) {
        stubProj = findProjectById(request.params.pid);
        if (!stubProj) {
            response.sendStatus(404);
        }
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
    })

    .get(function (request, response) {
        stubProj = findProjectById(request.params.pid);
        if (!stubProj) {
            response.sendStatus(404);
        }
        response.send(stubProj.tasks);
    });

//get one task
router.route('/:pid/tasks/:tid')
    .get(function (request, response) {
        stubProj = findProjectById(request.params.pid);
        if (!stubProj) {
            response.sendStatus(404);
        }
        stubTask = findTaskById(request.params.tid);
        if (!stubTask) {
            response.sendStatus(404);
        }
        response.send(stubTask);
    })

    .put(jsonParser, function (request, response) {
        if (!request.body) {
            response.sendStatus(404);
        }
        stubProj = findProjectById(request.params.pid);
        if (!stubProj) {
            response.sendStatus(404);
        }
        stubTask = findTaskById(request.params.tid);
        if (!stubTask) {
            response.sendStatus(404);
        }
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
    })

    .delete(function (request, response) {
        stubProj = findProjectById(request.params.pid);
        if (!stubProj) {
            response.sendStatus(404);
        }
        for (var i = 0, len = stubProj.tasks.length; i <len; i++) {
            if (stubProj.tasks[i].taskId == request.params.tid) {
                stubTask = stubProj.tasks[i];
                break;
            }
        }
        if (!stubTask) {
            response.sendStatus(404);
        }
        stubProj.tasks.splice(i, 1);
        response.send(stubProj.tasks);
    });

module.exports = router;