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

/*
 * Test the /PUT route
 */
describe('/PUT/:id project', function(){
    it('it should UPDATE a project', function(done){
        var project = {
            "name" : "New project",
            "description" : "Cupiditate quibusdam perferendis es",
            "author" : "Oleg",
            "startDate" : "2016-11-25T04:57:54.481Z"
        };
        chai.request(app)
        .put('/rest/projects/123')
        .send(project)
        .end(function (err, res)  {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('New project');
            res.body.should.have.property('author').eql('Oleg');
            done();
        });
    });
    it('it should NOT UPDATE a project with wrong ID', function(done){
        var project = {
            "name" : "New project",
            "description" : "Cupiditate quibusdam perferendis es",
            "author" : "Oleg",
            "startDate" : "2016-11-25T04:57:54.481Z"
        };
        chai.request(app)
            .put('/rest/projects/12355')
            .send(project)
            .end(function (err, res)  {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Failed to find project!');
                done();
            });
    });
    it('it should NOT UPDATE a project with empty body', function(done){
        var project = {};
        chai.request(app)
            .put('/rest/projects/123')
            .send(project)
            .end(function (err, res)  {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Failed to update because of empty body!');
                done();
            });
    });
});
/*
 * Test the /DELETE route
 */
describe('/DELETE/:id project', function(){
    it('it should DELETE a project', function(done){
        chai.request(app)
        .delete('/rest/projects/123')
        .end(function (err, res)  {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('OK');
            done();
        });
    });
    it('it should NOT DELETE a project with wrong ID', function(done){
        chai.request(app)
            .delete('/rest/projects/12355')
            .end(function (err, res)  {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Failed to delete project!');
                done();
            });
    });
});

