define(['moment'], function (Moment) {
    'use strict';

    var TimeLineLib = function (startDate, dayStart, dayDuration) {
        this.startDate = startDate;
        this.dayStart = dayStart;
        this.dayDuration = dayDuration;
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
    return TimeLineLib;
});
