'use strict';

var express = require('express');
var app = require('../../app');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var mongoose = require('mongoose');
var Project = require('../../mongoose').ProjectModel;

describe('Test projects routes', function() {

    /*
     * Test the GET/ route
     */
    describe('/GET/ project', function ()  {
        it('it should have status 200', function(done) {
            chai.request(app)
                .get('/rest/projects/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should be an array', function(done) {
            chai.request(app)
                .get('/rest/projects/')
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it length should be equal 2', function(done) {
            chai.request(app)
                .get('/rest/projects/')
                .end(function (err, res) {
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });

    /*
     * Test the POST/ route
     */
    describe('/POST project', function() {
        it('it should have status 200', function(done) {
            var project = new Project ({
                "name": 'projname',
                "description": 'wow project',
                "author": 'me',
                "startDate": 1231,
                "createDate": 1231,
                "modifiedDate": 1231
            });
            chai.request(app)
                .post('/rest/projects/')
                .send(project)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should be an object', function(done) {
            var project = new Project ({
                "name": 'projname',
                "description": 'wow project',
                "author": 'me',
                "startDate": 1231,
                "createDate": 1231,
                "modifiedDate": 1231
            });
            chai.request(app)
                .post('/rest/projects/')
                .send(project)
                .end(function (err, res) {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should have standart properties', function(done) {
            var project = new Project ({
                "name": 'projname',
                "description": 'wow project',
                "author": 'me',
                "startDate": 1231,
                "createDate": 1231,
                "modifiedDate": 1231
            });
            chai.request(app)
                .post('/rest/projects/')
                .send(project)
                .end(function (err, res) {
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('author');
                    res.body.should.have.property('startDate');
                    res.body.should.have.property('createDate');
                    res.body.should.have.property('modifiedDate');
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
                .get('/rest/projects/123')
                .end(function (err, res) {
                    res.body.id.should.be.eql(123);
                    done();
                });
        });

        it('it should have status 200', function(done) {
            chai.request(app)
                .get('/rest/projects/123')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should be an object', function(done) {
            chai.request(app)
                .get('/rest/projects/123')
                .end(function (err, res) {
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should NOT GET project with id = "10"', function(done) {
            chai.request(app)
                .get('/rest/projects/123')
                .end(function (err, res) {
                    res.body.id.should.not.be.eql(10);
                    done();
                });
        });

    });

});
