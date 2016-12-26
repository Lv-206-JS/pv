define(['backbone', 'moment'], function (Backbone, Moment) {
    'use strict';

    var TimeLineLib = function (model) {
        this.startDate =  model.get('startDate');
        this.settings = model.get('settings');
        this.dayStart = Number(this.settings.dayStart);
        this.dayDuration = Number(this.settings.dayDuration);
        this.tasks = model.get('tasks');
    };

    TimeLineLib.prototype.getStartTime = function() {
        var date = Moment.unix(this.startDate).startOf('day');
        return date.seconds(this.dayStart);
    };

    TimeLineLib.prototype.toDate = function(ptlSeconds) {
        var ptlDay = this.dayDuration;
        var ptlDays = Math.floor(ptlSeconds / ptlDay);

        var realDate = this.getStartTime();
        var weekDay = "";
        while (ptlDays > 0) {
            weekDay = realDate.day();
            if (weekDay != 0 && weekDay != 6) {
                ptlDays--;
            }
            realDate.add(1, 'days');
        }
        if (realDate.day() == 0) {
            realDate.add(1, 'days');
        } else if (realDate.day() == 6) {
            realDate.add(2, 'days');
        }
        realDate.add(ptlSeconds % ptlDay, 'seconds');
        return realDate.format('X');
    };

    TimeLineLib.prototype.calculateEstimateTime = function (tasks) {
            var tasks = tasks || this.tasks;
            var tasksEnd = [];
            var currentTaskEnd;
            for (var i = 0; i < tasks.length; i++) {
                currentTaskEnd = Number(tasks[i].startDate) +
                    Number(tasks[i].estimateTime);
                tasksEnd.push(currentTaskEnd);
            }
            tasksEnd.sort(function(a, b) {return b - a;});
            return tasksEnd[0];
    };

    TimeLineLib.prototype.getWorkDays = function(ptlTaskStart, ptlTaskDuration) {
        var ptlStart = Number(ptlTaskStart);
        var taskDuration = Number(ptlTaskDuration);
        var workDay = this.dayDuration;
        var dayStart = this.dayStart;

        var startDate = this.toDate(ptlStart);

        var firstDayStartTime = Moment.duration(Moment.unix(startDate).hours(), 'hours').asSeconds();
        var workDayForLoop = workDay - (firstDayStartTime - dayStart);
        var result = [];
        var stepDuration = 0;
        var currentDate = startDate;

        while (taskDuration > 0) {
            stepDuration++;
            taskDuration--;
            if (stepDuration == workDayForLoop || taskDuration == 0) {

                if (Moment.unix(currentDate).day() == 6) {
                    currentDate = Moment.unix(currentDate).add(2, 'day').format('X');
                } else if (Moment.unix(currentDate).day() == 0) {
                    currentDate = Moment.unix(currentDate).add(1, 'day').format('X');
                }
                result.push({realDate: currentDate, workHours: stepDuration});
                stepDuration = 0;
                if (Moment.unix(currentDate).seconds() != dayStart) {
                    currentDate = Moment.unix(currentDate).add(1, 'day').startOf('day').seconds(dayStart).format('X');
                }
                if (workDayForLoop != workDay) {
                    workDayForLoop = workDay;
                }
            }
        }

        return result;
    };

    return TimeLineLib;
});
