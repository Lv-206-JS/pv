'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var projStub = require('./project-stub.json');

//functions for
function getDate() {
    return new Date();
}

function increaseIdCounter () {
    var biggestId = 0;
    for(var i = 0; i < projStub.length; i++) {
        biggestId = Math.max(biggestId, projStub[i].id);
    }
    return ++biggestId;
}

/*
======= will be used when we will start use db`es =======
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts';
*/

//get all projects
router.get('/', function (request, response) {
    var stubCopy = projStub;
    response.send(stubCopy);
});

//get one project
router.get('/:id', function (request, response) {
    var stubCopy;
    for (var i = 0, len = stub.length; i < len; i++) {
        if(projStub[i].id === request.params.id) {
            stubCopy = projStub[i];
        }
    }
    response.send(stubCopy);
});

//create project
router.post('/', jsonParser, function (request, response) {
    var projStubCopy = projStub;
    projStubCopy.push({
        "id": increaseIdCounter(),
        "name": request.body.name,
        "description": request.body.description,
        "author": request.body.author,
        "startDate": request.body.startDate,
        "createDate": getDate(),
        //on save will be changing <===== must be implement
        "modifiedDate": getDate()
    });
    response.send(projStubCopy);
});

//update project
router.put('/:id', jsonParser, function (request, response) {
    var stub  = require('./project-stub.json');
    var element;

    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == request.params.id) {
            element = i;
        }
    }
    stub[element].id = request.body.id;
    stub[element].name = request.body.name;
    // stub[element].calender.hoursPerWorkingDay = request.body.hoursPerWorkingDay;
    // stub[element].tasks[0].taskIdA = equest.body.taskIdA;
    // stub[element].tasks[0].dependencies[0].taskIdB = request.body.taskIdB;
    // stub[element].tasks[0].dependencies[0].type = request.body.type;
    // stub[element].tasks[1].taskIdB = equest.body.taskIdB;
    // stub[element].tasks[1].dependencies = request.body.dependencies;
     stub[element].milestones = request.body.milestones;
     stub[element].attachments = request.body.attachments;

    response.send(stub);
});

//delete project
router.delete('/:id', function (request, response) {
    var stub  = require('./project-stub.json');
    var element;

    for (var i = 0, len = stub.length; i < len; i++) {
        if(stub[i].id == request.params.id) {
            element = i;
        }
    }
    stub.splice(element,1);
    response.send(stub);
});

module.exports = router;