'use strict';

var app = require('../../app');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var stub = require('../../rest/stubs/projectsStub.json');
var stubProj, stubTask;

var task = {
    "taskId": 13,
    "projectId": 123,
    "name": "task 3",
    "description": "This is super cool tasks.",
    "estimateTime": 4,
    "resource": "Developer 10",
    "dependsOn": [
        {
            "taskId": 12,
            "type": "Finish-To-Start"
        }
    ],
    "attachments": [
        {
            "attachmentId": "a1",
            "fileName": "blah.jpeg",
            "mimeType": "image/jpeg"
        }
    ]
};

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

describe('Test tasks routes', function() {

    // clear the before the test
    before(function(done){
        stubProj = findProjectById(123);
        done();
    });

    /*
     * Test the GET/:pid/ route
     */
    describe('/GET tasks', function ()  {
        it('it should GET all the tasks', function(done) {
            chai.request(app)
                .get('rest/tasks/123/')
                .end(function (err, res) {
                    //res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should NOT GET tasks by invalid project id', function(done) {
            chai.request(app)
                .get('rest/tasks/888/')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /*
     * Test the POST/:pid/ route
     */
    describe('/POST task', function() {
        it('it should POST a task', function(done) {
            chai.request(app)
                .post('rest/tasks/123/')
                .send(task)
                .end(function (err, res) {
                    //res.should.have.status(200);
                    done();
                });
            chai.request(app)
                .get('rest/tasks/123/13')
                .end(function (err, res) {
                    //res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property("taskId").eql(13);
                    res.body.should.have.property("projectId").eql(123);
                    res.body.should.have.property("name").eql("task 3");
                    res.body.should.have.property("estimateTime").eql(4);
                    res.body.should.have.property("resource").eql("Developer 10");
                    res.body.should.have.property("dependsOn").eql([
                        {
                            "taskId": 12,
                            "type": "Finish-To-Start"
                        }
                    ]);
                    res.body.should.have.property("attachments").eql([
                        {
                            "attachmentId": "a1",
                            "fileName": "blah.jpeg",
                            "mimeType": "image/jpeg"
                        }
                    ]);
                    done();
                });
        });

        it('should not POST a task with an empty request body', function(done) {
            chai.request(app)
                .post('rest/tasks/123/')
                .send('');
            chai.request(app)
                .get('rest/tasks/123/13')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

        it('should not POST a task by an invalid project id', function (done) {
            chai.request(app)
                .post('rest/tasks/111/')
                .send(task);
            chai.request(app)
                .get('rest/tasks/111/13')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });

        });
    });

    /*
     * Test the GET/:pid/:tid route
     */
    describe('/GET task', function ()  {
        it('it should GET a task by the given id', function(done) {
            chai.request(app)
                .get('rest/tasks/123/11/')
                .end(function (err, res) {
                    //res.should.have.status(200);
                    res.body.should.be.an('object');
                    //res.body.length.should.be.eql(0);
                    //res.body.should.have.property("taskId").eql(11);
                    //res.body.should.have.property("projectId").eql(123);
                    done();
                });
        });

        it('it should NOT GET a task with invalid project id', function(done) {
            chai.request(app)
                .get('rest/tasks/111/12')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should NOT GET a task with invalid task id', function(done) {
            chai.request(app)
                .get('rest/tasks/123/44')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });
    
});
