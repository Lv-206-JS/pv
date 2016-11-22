'use strict';

var express = require('express');
var app = express();

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var stub = require('.rest/stubs/projectsStub.json');
var stubProj, stubTask;

describe('Test tasks routes', function() {
    // clear the before the test
    before(function(done){
        stubProj = null;
        done();
    });

    /*
     * Test the GET/:pid/ route
     */
    describe('/GET tasks', function ()  {
        it('it should GET all the tasks', function(done) {
            chai.request(app)
                .get('/123/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should NOT GET tasks', function(done) {
            chai.request(app)
                .get('/888/')
                .end(function (err, res) {
                    res.should.have.status(404);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the POST/:pid/ route
     */
    describe('/POST task', function() {
        it('it should POST a task', function(done) {
            var task = {
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
            };
            chai.request(app)
                .post('/123/11')
                .send(task)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.task.should.have.property('taskId');
                    res.body.task.should.have.property('projectId');
                    res.body.task.should.have.property('name');
                    res.body.task.should.have.property('description');
                    res.body.task.should.have.property('estimateTime');
                    res.body.task.should.have.property('resource');
                    res.body.task.should.have.property('dependsOn');
                    res.body.task.should.have.property('attachments');
                    done();
                });
        });
        it('should not POST a task', function(done){

        });

    });
    /*
     * Test the GET/:pid/:tid route
     */
    describe('/GET task', function ()  {
        it('it should GET tasks with id = "11"', function(done) {
            chai.request(app)
                .get('/123/11/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.taskId.should.be.eql(11);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should NOT GET tasks with id = "44"', function(done) {
            chai.request(app)
                .get('/123/tasks/44')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });
    
});
