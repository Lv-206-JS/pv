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
     * Test the POST/ route
     */
    describe('/POST settings', function() {
        it('it should POST a settings', function(done) {
            var settings = {
                "dayDuration" : 12,
                "weekend" : ['Saturday', 'Sunday', 'Monday'],
                "icon" : 'wow! cool icon'
            };
            chai.request(app)
                .post('/123')
                .send(settings)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('OK!');
                    res.body.task.should.have.property('dayDuration');
                    res.body.task.should.have.property('weekend');
                    res.body.task.should.have.property('icon');
                    done();
                });
        });

        it('should not POST a project', function(done){
            var settings = {
                "dayDuration" : 12,
                "weekend" : ['Saturday', 'Sunday', 'Monday'],
                "icon" : 'wow! cool icon'
            };
            chai.request(app)
                .post('/123')
                .send(settings)
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
    describe('/GET settings', function ()  {
        it('it should GET project settings', function(done) {
            chai.request(app)
                .get('/123')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.params.pid.should.be.eql(123);
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
