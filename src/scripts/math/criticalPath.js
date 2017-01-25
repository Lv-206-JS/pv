define([], function () {
    'use strict';

    var CriticalPath = function (tasks) {
        this.tasks = tasks;
        this.criticalPath = [];
        this.pathes = [];
    };


    var proto = CriticalPath.prototype;

//function for starting task algorithm
    proto.startAlgorithm = function () {

        //if we get no one task - exit
        if (this.tasks.length == 0) {
            return [0, []];
        }
        var latestTask = this.getLatestTask(),
            path = [];

        path.push(latestTask);
        this.getPathes(latestTask, path);
        this.getCriticalPath();


        return this.criticalPath;
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

    return CriticalPath;
});

