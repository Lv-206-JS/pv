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

    TimeLineLib.prototype.getProjectEstimateTime = function () {
            var tasksEnd = [];
            var currentTaskEnd;
            for (var i = 0; i < this.tasks.length; i++) {
                currentTaskEnd = Number(this.tasks[i].startDate) +
                    Number(this.tasks[i].estimateTime);
                tasksEnd.push(currentTaskEnd);
            }
            tasksEnd.sort(function(a, b) {return b - a;});
            return tasksEnd[0];
    }

    return TimeLineLib;
});
