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

describe('Test settings routes', function() {

    /*
     * Test the GET/ route
     */
    describe('/GET/settings/:pid', function ()  {
        it('it should have status 200', function(done) {
            chai.request(app)
                .get('/rest/settings/123')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should be an object', function(done) {
            chai.request(app)
                .get('/rest/settings/123')
                .end(function (err, res) {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should have standart properties', function(done) {
            chai.request(app)
                .get('/rest/settings/123')
                .end(function (err, res) {
                    res.body.should.have.property('dayDuration').eql(100);
                    res.body.should.have.property('weekend').eql(['Mon', 'Tue']);
                    res.body.should.have.property('icon').eql('cool, very cool icon');
                    done();
                });
        });
    });

    /*
     * Test the /PUT/settings/:pid route
     */
    describe('/PUT/settings/:pid', function() {
        it('it should have status 200', function(done)  {
            var settings =  {
                dayDuration : 100,
                weekend : ['Mon', 'Tue'],
                icon : 'cool, very cool icon'
            };
                chai.request(app)
                .put('/rest/settings/123')
                .send(settings)
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should be an object', function(done)  {
            var settings =  {
                dayDuration : 100,
                weekend : ['Mon', 'Tue'],
                icon : 'cool, very cool icon'
            };
            chai.request(app)
                .put('/rest/settings/123')
                .send(settings)
                .end(function(err, res) {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should have standart properties', function(done)  {
            var settings =  {
                dayDuration : 100,
                weekend : ['Mon', 'Tue'],
                icon : 'cool, very cool icon'
            };
            chai.request(app)
                .put('/rest/settings/123')
                .send(settings)
                .end(function(err, res) {
                    res.body.should.have.property('dayDuration').eql(100);
                    res.body.should.have.property('weekend').eql(['Mon', 'Tue']);
                    res.body.should.have.property('icon').eql('cool, very cool icon');
                    done();
                });
        });
    });
});
