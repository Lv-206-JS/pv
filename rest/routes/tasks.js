'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var stub = require('../stubs/projectsStub.json');
var stubProj, stubTask;

// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts';

var findProjectById = function (projId) {
    var project;
    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == projId) {
            project = stub[i];
            return project;
        }
    }
    return null;
};

var findTaskById = function (taskId) {
    var tasks = stubProj.tasks;
    var len = tasks.length;
    for (var i = 0; i < len; i++) {
        if (stubProj.tasks[i].taskId == taskId) {
            return stubProj.tasks[i];
        }
    }
    return null;
};

var countId = function (obj) {
    var biggestId = 0, len = obj.length;
    for(var i = 0; i < len; i++) {
        biggestId = Math.max(biggestId, obj[i].id);
    }
    return ++biggestId;
};

router.get('/:pid', function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (!stubProj) {
        response.sendStatus(404);
    }
    response.send(stubProj.tasks);
});

router.post('/:pid', jsonParser, function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (!stubProj) {
        response.sendStatus(404);
    }
    stubProj.tasks.push({
        "taskId": countId(stubProj.tasks),
        "projectId": request.params.pid,
        "name": request.body.name,
        "description": (request.body.description) ? request.body.description : null,
        "estimateTime": request.body.estimateTime,
        "resource": request.body.resource,
        "dependsOn": [
            {
                "taskId": (request.body.dependsOn[0]) ? request.body.dependsOn[0].taskId : null,
                "type": (request.body.dependsOn[0]) ? request.body.dependsOn[0].type : null
            }
        ],
        "attachments": [
            {
                "attachmentId": (request.body.attachments[0]) ? countId(stubProj.tasks[taskId].attachments) : null,
                "fileName": (request.body.attachments[0]) ? request.body.attachments[0].fileName : null,
                "mimeType": (request.body.attachments[0]) ? request.body.attachments[0].mimeType : null
            }
        ]
    });
    var i, length = stubProj.tasks.length;
    //check if dependency exists
    if (request.body.dependsOn[0] === undefined) {
        stubProj.tasks.dependsOn.push({
            "taskId": null,
            "type": null
        });
    } else {
        //check multiple dependencies
        for (i = 0; request.body.dependsOn[i]; i++) {
            "dependsOn".push({
                "taskId": countId(stubProj.tasks[length - 1].dependsOn),
                "type": request.body.dependsOn[0].type
            });
        }
    }
    //check if attachment exists
    if (request.body.attachments[0] === undefined) {
        stubProj.tasks.attachments.push({
            "attachmentId": null,
            "fileName": null,
            "mimeType": null
        });
    }
    else {
        //check multiple attachments
        for (i = 1; request.body.attachments[i]; i++) {
            stubProj.tasks.attachments.push({
                "attachmentId": countId(stubProj.tasks[length - 1].attachments),
                "fileName": request.body.attachments[i].fileName,
                "mimeType": request.body.attachments[i].mimeType
            });
        }
    }
    response.send(stubProj.tasks[length - 1]);
});

router.get('/:pid/:tid', function (request, response) {
    stubProj = findProjectById(request.params.pid);
    if (!stubProj) {
        response.sendStatus(404);
    }
    stubTask = findTaskById(request.params.tid);
    if (!stubTask) {
        response.sendStatus(404);
    }
    response.send(stubTask);
});

router.put('/:pid/:tid', jsonParser, function (request, response) {
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
    stubProj.tasks.push({
        "taskId": countId(stubProj.tasks),
        "projectId": request.params.pid,
        "name": request.body.name,
        "description": (request.body.description) ? request.body.description : null,
        "estimateTime": request.body.estimateTime,
        "resource": request.body.resource,
        "dependsOn": [
            {
                "taskId": (request.body.dependsOn[0]) ? request.body.dependsOn[0].taskId : null,
                "type": (request.body.dependsOn[0]) ? request.body.dependsOn[0].type : null
            }
        ],
        "attachments": [
            {
                "attachmentId": (request.body.attachments[0]) ? countId(stubProj.tasks[taskId].attachments) : null,
                "fileName": (request.body.attachments[0]) ? request.body.attachments[0].fileName : null,
                "mimeType": (request.body.attachments[0]) ? request.body.attachments[0].mimeType : null
            }
        ]
    });
    var i, length = stubProj.tasks.length;
    //check if dependency exists
    if (request.body.dependsOn[0] === undefined) {
        stubProj.tasks.dependsOn.push({
            "taskId": null,
            "type": null
        });
    } else {
        //check multiple dependencies
        for (i = 0; request.body.dependsOn[i]; i++) {
            "dependsOn".push({
                "taskId": countId(stubProj.tasks[length - 1].dependsOn),
                "type": request.body.dependsOn[0].type
            });
        }
    }
    //check if attachment exists
    if (request.body.attachments[0] === undefined) {
        stubProj.tasks.attachments.push({
            "attachmentId": null,
            "fileName": null,
            "mimeType": null
        });
    }
    else {
        //check multiple attachments
        for (i = 1; request.body.attachments[i]; i++) {
            stubProj.tasks.attachments.push({
                "attachmentId": countId(stubProj.tasks[length - 1].attachments),
                "fileName": request.body.attachments[i].fileName,
                "mimeType": request.body.attachments[i].mimeType
            });
        }
    }

    stubProj.tasks[stubTask.taskId] = stubTask;
    response.send(stubProj.tasks[stubTask.taskId]);
});

router.delete('/:pid/:tid', function (request, response) {
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
    //response.send(stubProj.tasks);
    response.sendStatus(200);
});

module.exports = router;