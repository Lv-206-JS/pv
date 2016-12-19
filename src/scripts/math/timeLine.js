define(['moment'], function (Moment) {
    'use strict';
var moment = new Moment;

var TimeLine = function() {
    var self = this;
    this.workDayStart = 10;
    this.workDayDuration = 6;
    //this.projectEstimateTime = 62;

    //must have access to project start date
    this.startDate = moment('2016-07-10T04:57:54.481Z').format('X');
    this.toDate = function(ptlSeconds) {
        var ptlDay = moment.duration(self.workDayDuration, 'hours').asSeconds();
        var ptlDays = Math.floor(ptlSeconds / ptlDay);

        var realDate = moment.unix(self.getStartTime());
        var weekDay;
        while (ptlDays > 0) {
            weekDay = realDate.day();
            if (weekDay != 0 && weekDay != 6) {
                ptlDays--;
            }
            realDate = realDate.add(1, 'days');
        }

        realDate = realDate.add(ptlSeconds % ptlDay, 'seconds');
        return moment(realDate).format('X');

    };
    this.getStartTime = function() {
        var date = moment.unix(self.startDate).startOf('day');
        date = moment(date).hours(self.workDayStart);
        //deprecate
        return moment(date).format('X');
    };
};
});
module.exports = timeLine;
