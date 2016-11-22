'use strict';

var express = require('express');
var app = express();

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var mongoose = require('mongoose');
var Project = require('../../mongoose').ProjectModel;

describe('Test tasks routes', function() {

    /*
     * Test the GET/ route
     */
    describe('/GET project', function ()  {
        it('it should GET all the tasks', function(done) {
            chai.request(app)
                .get('/rest/projects/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the POST/ route
     */
    describe('/POST project', function() {
        it('it should POST a project', function(done) {
            var project = {
                "id": 12,
                "name": 'projname',
                "description": 'wow project',
                "author": 'me',
                "startDate": 1231,
                "createDate": 1231,
                "modifiedDate": 1231
            };
            chai.request(app)
                .post('/')
                .send(project)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('OK!');
                    res.body.task.should.have.property('id');
                    res.body.task.should.have.property('name');
                    res.body.task.should.have.property('author');
                    res.body.task.should.have.property('startDate');
                    res.body.task.should.have.property('createDate');
                    res.body.task.should.have.property('modifiedDate');
                    done();
                });
        });

        it('should not POST a project', function(done){
            var project = {
                "id": 12,
                "name": 'projname',
                "description": 'wow project',
                "author": 'me',
                "startDate": 1231,
                "createDate": 1231,
                "modifiedDate": 1231
            };
            chai.request(app)
                .post('/')
                .send(project)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });

    });
    /*
     * Test the GET/:id route
     */
    describe('/GET project', function ()  {
        it('it should GET project with id = "123"', function(done) {
            chai.request(app)
                .get('/123')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.id.should.be.eql(123);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should NOT GET project with id = "10"', function(done) {
            chai.request(app)
                .get('/123')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });

});
