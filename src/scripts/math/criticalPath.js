define([], function () {
    'use strict';

    var CriticalPath = function (tasks) {
        this.tasks = tasks.slice();
        this.criticalPath = [];
        this.pathes = [];
        this.levels = [];
    };


    var proto = CriticalPath.prototype;

//function for starting task algorithm
    proto.startAlgorithm = function () {

        //if we get no one task - exit
        if (this.tasks.length == 0) {
            return [0, []];
        }
        this.matrix = this.matrixCreate();
        this.setMatrix();
        var levels, tasksInLevels;
        if(!this.checkDependenciesExist()) {
            levels =  this.setTasksWithoutDepToLevels();
            this.getLevelsInLine(levels);
            this.getTasksStartDays();
            this.startCriticalPathAlgo();
            return this.criticalPath;
        }
        //creating levels and setting tasks to sub levels
        levels = this.createLevels(this.matrix);
        tasksInLevels = this.setTasksToLevels(levels);

        this.getLevelsInLine(tasksInLevels);
        this.getTasksStartDays();
        this.startCriticalPathAlgo();


        return this.criticalPath;
    };

    proto.startCriticalPathAlgo = function () {
        var latestTask = this.getLatestTask(),
            path = [];

        path.push(latestTask);
        this.getPathes(latestTask, path);
        this.getCriticalPath();
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

    proto.getPathes = function shortestPath(startTask, path) {
        if (this.tasks[startTask].dependsOn.length == 0) {
            this.pathes.push(path);
            return;
        }
        var next;
        for (var j = 0; j < this.tasks[startTask].dependsOn.length; j++) {
            var newPath = path.slice();
            next = this.findTaskObject(this.tasks[startTask].dependsOn[j].taskId, 'id');
            newPath.push(next);
            this.getPathes(next, newPath);
        }
    };

    proto.getLatestTask = function () {
        var max = -Infinity, taskId, task, taskEndTime;
        for (var i = 0; i < this.tasks.length; i++) {
            task = this.tasks[i];
            taskEndTime = task.startDate + task.estimateTime;
            if (taskEndTime > max) {
                max = taskEndTime;
                taskId = task.taskId;
            }
        }
        taskId = this.findTaskObject(taskId, 'id');
        return taskId;
    };

    proto.getCriticalPath = function () {
        var maxPath = [], criticalTime;
        for (var i = 0; i < this.pathes.length; i++) {
            if (this.pathes[i].length > maxPath.length) {
                maxPath = this.pathes[i];
            }
        }
        criticalTime = this.getCriticalTime(maxPath);
        maxPath = this.getTaskIds(maxPath).reverse();
        this.criticalPath.push(criticalTime, maxPath);
    };

    proto.getCriticalTime = function (path) {
        var startTask = this.tasks[path[path.length - 1]],
            latestTask = this.tasks[path[0]],
            criticalTime = (latestTask.startDate + latestTask.estimateTime) - startTask.startDate;
        return criticalTime;
    };

    proto.getTaskIds = function (maxPath) {
        var critPath = maxPath;
        for (var i = 0; i < critPath.length; i++) {
            critPath[i] = this.tasks[critPath[i]].taskId;
        }
        return critPath;
    };

    //function for creating matrix climbing
    proto.matrixCreate = function matrixCreate() {
        var tasks = this.tasks;
        var matrix = new Array(tasks.length);
        for(var i = 0; i < tasks.length; i++) {
            matrix[i] = new Array(tasks.length).fill(0);
        }
        return matrix;
    };

//function for setting matrix by 0 or 1
    proto.setMatrix = function () {
        var tasks = this.tasks;
        for(var i = 0; i < tasks.length; i++){
            for(var j = 0; j < tasks[i].dependsOn.length; j++) {
                if(this.matrix[i][this.findTaskObject(tasks[i].dependsOn[j].taskId, 'id')] == 1){
                    continue;
                }
                this.matrix[this.findTaskObject(tasks[i].dependsOn[j].taskId, 'id')][i] = 1;
            }
        }
    };

//function for summing column for creating levels
    proto.sumLevel = function (level) {
        var sum = 0;
        for(var i = 0; i < level.length; i++) {
            sum += level[i];
        }
        return sum;
    };

//filling row of matrix by null if sum if column sum is 0
    proto.fillMatrixRowNull = function(matrix, level) {
        for(var i = 0; i < matrix.length; i++) {
            if(level[i] == 0) {
                matrix[i].fill(0);
            }
        }
    };

//function for creating levels by column sum
    proto.createLevels = function (matrix) {
        var copyMatrix = matrix;
        var level = new Array(copyMatrix.length).fill(0);

        //summing column values
        for(var row = 0; row < copyMatrix.length; row++) {
            for(var col = 0; col < copyMatrix.length; col++) {
                level[col] += copyMatrix[row][col];
            }
        }

        //filling row by 0 if column sum value is 0
        this.fillMatrixRowNull(copyMatrix, level);

        //checking
        if(this.sumLevel(level) == 0) {
            return level;
        }

        //recursion
        var levelToPush = this.createLevels(copyMatrix);

        //basic array for this and befored arrays
        var allLevels = [];

        //pushing this array to basic
        allLevels.push(level);

        //if elements of array is arrays ==> push them one by one to basic array allLevels
        if(levelToPush[0] instanceof Array) {
            for(var i = 0; i < levelToPush.length; i++) {
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
        for(var i = 0; i < levels.length; i++) {
            tasksLevels[i] = [];
            for(var j = 0; j < levels[i].length; j++) {
                if(levels[i][j] == 0 && (i == 0 || (i > 0 && levels[i-1][j] != 0))) {
                    tasksLevels[i].push(tasks[j].taskId);
                }
            }
        }
        return tasksLevels;
    };

    proto.getLevelsInLine = function(levels) {
        for(var i = 0; i < levels.length; i++) {
            if(!(levels[0] instanceof Array)) {
                this.levels.push(levels);
                return;
            }
            else {
                this.getLevelsInLine(levels[i]);
            }
        }
    };

    proto.getTasksStartDays = function() {
        var prevDate = 0, estimates = [], tempTask;
        for(var i = 0; i < this.levels.length; i++) {
            for(var j = 0; j < this.levels[i].length; j++) {
                tempTask = this.findTaskObject(this.levels[i][j], 'object');
                estimates.push(tempTask.estimateTime);
                tempTask.startDate = prevDate;
            }
            prevDate += Math.max.apply(Math, estimates);
            estimates = [];
        }
    };

    proto.findTaskObject = function(id, whatReturn) {
        for(var i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].taskId == id) {
                if(whatReturn == 'object') {
                    return this.tasks[i];
                }
                else if(whatReturn == 'id') {
                    return i;
                }

            }
        }
    };

    proto.checkDependenciesExist = function () {
        for(var i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].dependsOn.length != 0) {
                return true;
            }
        }
        return false;
    };

    proto.checkSettedDependenciesExist = function (level, id) {
        var presentId = this.findTaskObject(id, 'id'), tempId;
        for(var i = 0; i < level.length; i++) {
            tempId = this.findTaskObject(level[i], 'id');
            for(var j = 0; j < this.tasks[presentId].dependsOn.length; j++) {
                if(this.tasks[presentId].dependsOn[j].taskId == level[i] || this.tasks[presentId].resource == this.tasks[tempId].resource) {
                    return false;
                }
            }
        }
        return true;
    };

    proto.setTasksWithoutDepToLevels = function setTasksWithoutDepToLevels() {
        var levels = [];
        levels[0] = [];
        for(var i = 0; i < this.tasks.length; i++) {
            levels[0].push(this.tasks[i].taskId);
        }
        return levels;
    };

    return CriticalPath;
});

