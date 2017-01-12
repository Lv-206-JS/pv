define(['backbone', 'models/Project'], function (Backbone, Model) {
    'use strict';

var TaskAlgo =  function (options) {
    this.model = options.model;

    this.tasks = this.model.get('tasks');
    this.levels = [];
};

var proto = TaskAlgo.prototype;

//function for starting task algorithm
proto.startAlgorithm = function () {
    if(this.tasks.length == 0) {
        return this.tasks;
    }
    this.matrix = this.matrixCreate();
    this.setMatrix();
    var levels, tasksInLevels, profitLevels;
    if(!this.checkDependenciesExist()) {
        levels =  this.setTasksWithoutDepToLevels();
        profitLevels = this.setTasksWithRes(levels);
        this.getLevelsInLine(profitLevels);
        this.getTasksStartDays();
        return this.tasks;
    }
    //creating levels and setting tasks to sub levels
    levels = this.createLevels(this.matrix);
    tasksInLevels = this.setTasksToLevels(levels);

    profitLevels = this.setTasksWithRes(tasksInLevels);
    this.getLevelsInLine(profitLevels);
    this.getTasksStartDays(profitLevels);

    //return setted tasks by sub levels
    return this.tasks;
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

//function that setting tasks to sublevels with resources dependencies
proto.setTasksWithRes = function(tasksLevels) {
    var levels = [];
    for(var i = 0; i < tasksLevels.length; i++) {
        var count = 0,
            idPresentTask;
        levels[i] = [];
        levels[i][count] = [];
        for(var j = 0; j < tasksLevels[i].length; j++) {
            idPresentTask = this.findTaskObject(tasksLevels[i][j], 'id');
            if(i != 0 && this.checkSettedDependenciesExist(levels[i-1][levels[i-1].length-1], tasksLevels[i][j])) {
                levels[i-1][levels[i-1].length-1].push(tasksLevels[i][j]);
            }
            else if(j == 0) {
                levels[i][count].push(tasksLevels[i][j]);
            }
            else if(this.checkSimilarResource(tasksLevels[i], this.tasks[idPresentTask].taskId)) {
                count++;
                levels[i][count] = [];
                levels[i][count].push(tasksLevels[i][j]);
            }
            else {
                levels[i][0].push(tasksLevels[i][j]);
            }
        }
    }
    return levels;
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

//return true if task in current level have similar resource
proto.checkSimilarResource = function(tasksLevels, taskVal) {
    for(var i = 0; i < tasksLevels.length; i++) {
        if(this.tasks[this.findTaskObject(tasksLevels[i], 'id')].resource == this.tasks[this.findTaskObject(taskVal, 'id')].resource && tasksLevels[i] != taskVal) {
            return true;
        }
    }
    return false;
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

    return TaskAlgo;
});

//exports.taskAlgo = TaskAlgo.prototype;