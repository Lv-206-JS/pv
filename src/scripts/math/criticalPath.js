define([], function () {
    'use strict';

    var CriticalPath = function (tasks) {
        this.tasks = tasks;
        this.criticalPath = [];
        this.levels = [];
    };


    var proto = CriticalPath.prototype;

//function for starting task algorithm
    proto.startAlgorithm = function () {

        //if we get no one task - exit
        if (this.tasks.length == 0) {
            return [0, []];
        }

        var levels, tasksInLevels;

        this.matrix = this.matrixCreate();
        this.setMatrix();

        //if there are no one dependencies
        if (!this.checkDependenciesExist()) {
            levels = this.setTasksWithoutDepToLevels();
            this.getCriticalPath(levels);

            return this.criticalPath;
        }

        levels = this.createLevels(this.matrix);
        tasksInLevels = this.setTasksToLevels(levels);
        this.getCriticalPath(tasksInLevels);

        return this.criticalPath;
    };

//function for creating matrix climbing
    proto.matrixCreate = function matrixCreate() {
        var tasks = this.tasks;
        var matrix = new Array(tasks.length);
        for (var i = 0; i < tasks.length; i++) {
            matrix[i] = new Array(tasks.length).fill(0);
        }
        return matrix;
    };

//function for setting matrix by 0 or 1
    proto.setMatrix = function () {
        var tasks = this.tasks;
        for (var i = 0; i < tasks.length; i++) {
            for (var j = 0; j < tasks[i].dependsOn.length; j++) {
                if (this.matrix[i][this.findTaskObject(tasks[i].dependsOn[j].taskId, 'id')] == 1) {
                    continue;
                }
                this.matrix[this.findTaskObject(tasks[i].dependsOn[j].taskId, 'id')][i] = 1;
            }
        }
    };

//function for summing column for creating levels
    proto.sumLevel = function (level) {
        var sum = 0;
        for (var i = 0; i < level.length; i++) {
            sum += level[i];
        }
        return sum;
    };

//filling row of matrix by null if sum if column sum is 0
    proto.fillMatrixRowNull = function (matrix, level) {
        for (var i = 0; i < matrix.length; i++) {
            if (level[i] == 0) {
                matrix[i].fill(0);
            }
        }
    };

//function for creating levels by column sum
    proto.createLevels = function (matrix) {
        var copyMatrix = matrix;
        var level = new Array(copyMatrix.length).fill(0);

        //summing column values
        for (var row = 0; row < copyMatrix.length; row++) {
            for (var col = 0; col < copyMatrix.length; col++) {
                level[col] += copyMatrix[row][col];
            }
        }

        //filling row by 0 if column sum value is 0
        this.fillMatrixRowNull(copyMatrix, level);

        //checking and exit from recursive calling
        if (this.sumLevel(level) == 0) {
            return level;
        }

        //recursion
        var levelToPush = this.createLevels(copyMatrix);

        //basic array for this and befored arrays
        var allLevels = [];

        //pushing this array to basic
        allLevels.push(level);

        //if elements of array is arrays ==> push them one by one to basic array allLevels
        if (levelToPush[0] instanceof Array) {
            for (var i = 0; i < levelToPush.length; i++) {
                allLevels.push(levelToPush[i]);
            }
        }

        //push befored array to basic
        else {
            allLevels.push(levelToPush);
        }

        return allLevels;
    };

//function for setting tasks to overall levels
    proto.setTasksToLevels = function (levels) {
        var tasksLevels = [],
            tasks = this.tasks;
        for (var i = 0; i < levels.length; i++) {
            tasksLevels[i] = [];
            for (var j = 0; j < levels[i].length; j++) {
                if (levels[i][j] == 0 && (i == 0 || (i > 0 && levels[i - 1][j] != 0))) {
                    tasksLevels[i].push(tasks[j].taskId);
                }
            }
        }
        return tasksLevels;
    };

//function for getting task object or task id in array
    proto.findTaskObject = function (id, whatReturn) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].taskId == id) {
                if (whatReturn == 'object') {
                    return this.tasks[i];
                }
                else if (whatReturn == 'id') {
                    return i;
                }

            }
        }
    };

    proto.checkDependenciesExist = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].dependsOn.length != 0) {
                return true;
            }
        }
        return false;
    };

//function for seeting tasks to levels that does not have dependencies
    proto.setTasksWithoutDepToLevels = function setTasksWithoutDepToLevels() {
        var levels = [];
        levels[0] = [];
        for (var i = 0; i < this.tasks.length; i++) {
            levels[0].push(this.tasks[i].taskId);
        }
        return levels;
    };

    proto.getCriticalPath = function getCriticalPath(levels) {
        var criticalPath = [], criticalTime = 0;
        for (var i = 0; i < levels.length; i++) {
            var maxDur = -1, taskIdMax, task;
            for (var j = 0; j < levels[i].length; j++) {
                task = this.findTaskObject(levels[i][j], 'object');
                if (task.estimateTime > maxDur) {
                    maxDur = task.estimateTime;
                    taskIdMax = task.taskId;
                }
            }
            criticalPath.push(taskIdMax);
            criticalTime += maxDur;
        }
        this.criticalPath.push(criticalTime, criticalPath);
    };

    return CriticalPath;
});

