'use strict';

var criticalPath = require('../src/scripts/math/criticalPath');
var startAlgo = criticalPath.CriticalPath;
var chai = require('chai');
var expect = chai.expect;

describe('Test critical path algorithm', function () {

    /*
     *   Test empty array
     */

    describe('Test empty array', function () {
        var result = startAlgo.startAlgorithm([]);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 0', function (done) {
            expect(result.length).to.equal(0);
            done();
        });
    });

    /*
     *   Test array with 1 task without dependencies
     */

    describe('Test array with 1 task without dependencies', function () {
        var task = [{
            taskId: 123,
            dependsOn: [],
            estimateTime: 10
        }];
        var result = startAlgo.startAlgorithm(task);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 1', function (done) {
            expect(result.length).to.equal(1);
            done();
        });

        it('start date should be equal to 0', function (done) {
            expect(result[0].startDate).to.equal(0);
            done();
        });
    });

    /*
     *   Test array with 2 task without dependencies
     */

    describe('Test array with 2 task without dependencies', function () {
        var task = [{
            taskId: 123,
            dependsOn: [],
            estimateTime: 10
        },
            {
                taskId: 1234,
                dependsOn: [],
                estimateTime: 10
            }];
        var result = startAlgo.startAlgorithm(task);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 2', function (done) {
            expect(result.length).to.equal(2);
            done();
        });

        it('start date should be equal to 0 and 10', function (done) {
            expect(result[0].startDate).to.equal(0);
            expect(result[1].startDate).to.equal(0);
            done();
        });
    });

    /*
     *   Test 2 task with dependencies
     */

    describe('Test 2 task with dependencies', function () {
        var task = [
            {
                taskId: 2,
                dependsOn: [],
                estimateTime: 10
            },
            {
                taskId: 4,
                dependsOn: [
                    {taskId: 2}
                ],
                estimateTime: 10
            }
        ];
        var result = startAlgo.startAlgorithm(task);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 2', function (done) {
            expect(result.length).to.equal(2);
            done();
        });

        it('start date should be equal to 0 and 10', function (done) {
            expect(result[0].startDate).to.equal(0);
            expect(result[1].startDate).to.equal(10);
            done();
        });
    });

    /*
     *   Test 3 task without dependencies
     */

    describe('Test 3 task with dependencies', function () {
        var task = [
            {
                taskId: 10,
                dependsOn: [],
                estimateTime: 10
            },
            {
                taskId: 25,
                dependsOn: [{
                    taskId: 10
                }],
                estimateTime: 10
            },
            {
                taskId: 55,
                dependsOn: [],
                estimateTime: 10
            }
        ];
        var result = startAlgo.startAlgorithm(task);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 3', function (done) {
            expect(result.length).to.equal(3);
            done();
        });

        it('start date should be equal to 0, 10, 10', function (done) {
            expect(result[0].startDate).to.equal(0);
            expect(result[1].startDate).to.equal(10);
            expect(result[2].startDate).to.equal(0);
            done();
        });
    });

    /*
     *   Test many tasks with many dependencies
     */

    describe('Test many tasks with many dependencies', function () {
        var task = [
            {
                taskId: 0,
                dependsOn: [{
                    taskId: 1
                }],
                estimateTime: 10
            },
            {
                taskId: 1,
                dependsOn: [],
                estimateTime: 10
            },
            {
                taskId: 2,
                dependsOn: [],
                estimateTime: 10
            },
            {
                taskId: 3,
                dependsOn: [{
                    taskId: 2
                }],
                estimateTime: 10
            },
            {
                taskId: 4,
                dependsOn: [{
                    taskId: 1
                }],
                estimateTime: 10
            },
            {
                taskId: 5,
                dependsOn: [
                    {
                        taskId: 0
                    },
                    {
                        taskId: 2
                    }
                ],
                estimateTime: 10
            },
            {
                taskId: 6,
                dependsOn: [
                    {
                        taskId: 2
                    },
                    {
                        taskId: 3
                    }
                ],
                estimateTime: 10
            }

        ];
        var result = startAlgo.startAlgorithm(task);
        it('it should be an array', function (done) {
            expect(result).to.be.an('array');
            done();
        });

        it('length should be 7', function (done) {
            expect(result.length).to.equal(7);
            done();
        });

        it('start date should be equal to 20, 0, 10, 30, 40, 50, 60', function (done) {
            expect(result[0].startDate).to.equal(10);
            expect(result[1].startDate).to.equal(0);
            expect(result[2].startDate).to.equal(0);
            expect(result[3].startDate).to.equal(10);
            expect(result[4].startDate).to.equal(10);
            expect(result[5].startDate).to.equal(20);
            expect(result[6].startDate).to.equal(20);
            done();
        });
    });
});
