'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var projStub = require('./stubs/projectsStub');

//functions for working with
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

/*var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts';*/

//get all projects
router.route('/')
//create project
    .post(jsonParser, function (request, response) {
        var projStubCopy = projStub;
        projStubCopy.push({
            "id": increaseIdCounter(),
            "name": request.body.name,
            "description": request.body.description,
            "author": request.body.author,
            "startDate": request.body.startDate,
            "createDate": getDate(),
            "modifiedDate": getDate()
        });
        response.send(projStubCopy);
    })

    .get(function (request, response) {
        var projStubCopy = projStub;
        if (!projStubCopy) {
            response.sendStatus(404);
        }
        response.send(projStubCopy);
    });



//get one project
router.route('/:id')
    .get(function (request, response) {
        var projStubCopy = findProjectById(request.params.id);
        if (!projStubCopy) {
            response.sendStatus(404);
        }
        response.send(projStubCopy);
    })

//update project
    .put(jsonParser, function (request, response) {
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