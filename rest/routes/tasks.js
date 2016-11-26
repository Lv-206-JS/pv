'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var stub = require('../stubs/projectsStub.json');
var stubProj, stubTask;

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

var countTaskId = function () {
    var biggestId = 0;
    if (stubProj.tasks === undefined) return ++biggestId;
    var len = stubProj.tasks.length;
    for(var i = 0; i < len; i++) {
        biggestId = Math.max(biggestId, stubProj.tasks[i].taskId);
    }
    return ++biggestId;
};

var countAttachmentId = function (taskId) {
    var biggestId = 0;
    if (stubProj.tasks[taskId].attachments === undefined) return ++biggestId;
    var len = stubProj.tasks[taskId].attachments.length;
    for(var i = 0; i < len; i++) {
        biggestId = Math.max(biggestId, stubProj.tasks[taskId].attachments[i].attachmentId);
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
    if (!request.body) {
        response.sendStatus(404);
    }
    stubProj = findProjectById(request.params.pid);
    if (!stubProj) {
        response.sendStatus(404);
    }
    var i, length = stubProj.tasks.length;
    stubProj.tasks.push({
        "taskId": countTaskId(),
        "projectId": request.params.pid,
        "name": request.body.name,
        "description": (request.body.description) ? request.body.description : null,
        "estimateTime": request.body.estimateTime,
        "resource": request.body.resource,
        "dependsOn":[],
        "attachments":[]
    });
    length = stubProj.tasks.length;
    //check if dependency exists
    if (request.body.dependsOn === undefined) {
        stubProj.tasks[length-1]["dependsOn"] = null;
    } else {
        //check multiple dependencies
        for (i = 0; request.body.dependsOn[i]; i++) {
            stubProj.tasks[length-1]["dependsOn"][i] = {
                "taskId": request.body.dependsOn[i].taskId,
                "type": request.body.dependsOn[i].type
            };
        }
    }
    //check if attachment exists
    if (request.body.attachments === undefined) {
        stubProj.tasks[length-1]["attachments"] = null;
    }
    else {
        //check multiple attachments
        for (i = 0; request.body.attachments[i]; i++) {
            stubProj.tasks[length-1]["attachments"][i] = {
                "attachmentId": countAttachmentId(length-1),
                "fileName": request.body.attachments[i].fileName,
                "mimeType": request.body.attachments[i].mimeType
            };
        }
    }
    response.send(stubProj.tasks[length-1]);
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
    for (var i = 0, len = stubProj.tasks.length; i <len; i++) {
        if (stubProj.tasks[i].taskId == request.params.tid) {
            stubTask = stubProj.tasks[i];
            break;
        }
    }
    if (!stubTask) {
        response.sendStatus(404);
    }
    stubProj.tasks[i] = {
        "taskId": request.params.tid,
        "projectId": request.params.pid,
        "name": request.body.name,
        "description": (request.body.description) ? request.body.description : null,
        "estimateTime": request.body.estimateTime,
        "resource": request.body.resource,
        "dependsOn":[],
        "attachments":[]
    };
    //check if dependency exists
    if (request.body.dependsOn === undefined) {
        stubProj.tasks[i]["dependsOn"] = null;
    } else {
        //check multiple dependencies
        for (var j = 0; request.body.dependsOn[j]; j++) {
            stubProj.tasks[i]["dependsOn"][j] = {
                "taskId": request.body.dependsOn[j].taskId,
                "type": request.body.dependsOn[j].type
            };
        }
    }
    //check if attachment exists
    if (request.body.attachments === undefined) {
        stubProj.tasks[i]["attachments"] = null;
    }
    else {
        //check multiple attachments
        for (j = 0; request.body.attachments[j]; j++) {
            stubProj.tasks[i]["attachments"][j] = {
                "attachmentId": countAttachmentId(i),
                "fileName": request.body.attachments[j].fileName,
                "mimeType": request.body.attachments[j].mimeType
            };
        }
    }
    response.send(stubProj.tasks[i]);
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