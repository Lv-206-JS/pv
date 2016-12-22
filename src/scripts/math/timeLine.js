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
        var date = Moment(this.startDate).startOf('day');
        date = Moment(date).hours(this.dayStart);
        return date;
    };

    TimeLineLib.prototype.toDate = function(ptlSeconds) {
        var ptlDay = Moment.duration(this.dayDuration, 'hours').asSeconds();
        var ptlDays = Math.floor(ptlSeconds / ptlDay);

        var realDate = Moment(this.getStartTime());
        var weekDay = "";
        while (ptlDays > 0) {
            weekDay = realDate.day();
            if (weekDay != 0 && weekDay != 6) {
                ptlDays--;
            }
            realDate = realDate.add(1, 'days');
        }
        if (realDate.day() == 0) {
            realDate = realDate.add(1, 'days');
        } else if (realDate.day() == 6) {
            realDate = realDate.add(2, 'days');
        }

        realDate = realDate.add(ptlSeconds % ptlDay, 'seconds');
        return Moment(realDate).format('X');
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

    TimeLineLib.prototype.getWorkDays = function(ptlStart, ptlTaskDuration) {
        //prepare string data form mongo db
        var ptlStart = Moment.duration(Number(ptlStart), 'hours').asSeconds();
        var ptlTaskDuration = Moment.duration(Number(ptlTaskDuration), 'hours').asSeconds();
        var workDay = Moment.duration(this.dayDuration, 'hours').asSeconds();
        var dayStart = Moment.duration(this.dayStart, 'hours').asSeconds();

        var startDate = this.toDate(ptlStart);

        var firstDayStartTime = Moment.duration(Moment.unix(startDate).hours(), 'hours').asSeconds();
        var workDayForLoop = workDay - (firstDayStartTime - dayStart);
        var result = [];
        var stepDuration = 0;
        var currentDate = startDate;

        while (ptlTaskDuration > 0) {
            stepDuration++;
            ptlTaskDuration--;
            if (stepDuration == workDayForLoop || ptlTaskDuration == 0) {

                if (Moment.unix(currentDate).day() == 6) {
                    currentDate = Moment.unix(currentDate).add(2, 'day').format('X');
                } else if (Moment.unix(currentDate).day() == 0) {
                    currentDate = Moment.unix(currentDate).add(1, 'day').format('X');
                }

                result.push({realDate: currentDate, workHours: stepDuration});
                stepDuration = 0;
                currentDate = Moment.unix(currentDate).add(1, 'day').startOf('day').seconds(dayStart).format('X');
                if (workDayForLoop != workDay) {
                    workDayForLoop = workDay;
                }
            }
        }

        var string = '';
        for (var i = 0; i < result.length; i++) {
            string += Moment.unix(result[i].realDate).format('DD/MM/YY hh:mm a dddd') + ', ' +
                (result[i].workHours / 3600) + '\n';
        }

        return 'Start date: ' + Moment.unix(startDate).format('DD/MM/YY hh:mm a dddd') + '\n' + string;
    };

    return TimeLineLib;
});
