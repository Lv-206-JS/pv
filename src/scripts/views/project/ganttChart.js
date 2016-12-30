define([
    'backbone',
    'JST',
    'moment',
    'timeLine',
    'views/project/ganttTaskRow'
    ], function (Backbone, JST, Moment, TimeLineLib, GanttTaskRowView) {
        'use strict';

        var GanttChartView = Backbone.View.extend({
            template: JST['project:ganttChart'],
            id: 'gantt-chart',

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.milestones = options.model.get('milestones');
                this.settings = options.model.get('settings');
                this.dayStart = Number(this.settings.dayStart);
                this.dayDuration = Number(this.settings.dayDuration);
                this.tasksPositions = (options.tasksPositions !== undefined) ? options.tasksPositions : null;
                this.zoom = options.zoom;
                this.hourLength = options.hourLength;
                this.timeLine = new TimeLineLib(this.model);
            },

            render: function render() {
                this.createGanttChartDateHeader(this.hourLength, this.dayStart, this.dayDuration);
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.renderTaskRows();
                return this;
            },

            createGanttChartDateHeader: function (hourLength, dayStart, dayDuration) {
                var i, j, topDates = [], bottomDates = [],
                    projectStart = this.timeLine.toDate(0), // in unixstamp
                    projectStartUnix = Moment.unix(projectStart), // in unix
                    dayStartAsHour = Moment(projectStartUnix, 's').format('hh:mm'),
                    dayEndAsHour =  Moment(projectStartUnix, 's').add(dayDuration/3600, 'h').format('hh:mm'),
                    projectStartAsCalendarDate =  Moment(projectStartUnix, 's').format('DD/MM/YY'),
                    weekStartDate = Moment(projectStartUnix, 's').startOf('week'),
                    projectStartAsWeekStartDate = Moment(weekStartDate, 's').add(1, 'd'),
                    projectDuration = this.timeLine.calculateEstimateTime(),
                    projectDurationUnix = this.timeLine.toDate(projectDuration) - this.timeLine.toDate(0), // in unix
                    projectDurationAsHours = Moment.duration(projectDuration, 's').asHours(),
                    projectDurationAsDays = Math.floor(Moment.duration(projectDurationUnix, 's').asDays()),
                    projectDurationAsWeeks = Math.ceil(Moment.duration(projectDurationUnix, 's').asWeeks()),
                    projectDurationAsMonths = Math.ceil(Moment.duration(projectDurationUnix, 's').asMonths()),
                    projectDurationAsYears = Math.ceil(Moment.duration(projectDurationUnix, 's').asYears());
                // bottomDates are hours | topDates are days
                if (hourLength >= 48) {
                    var hour = dayStartAsHour,
                        date = projectStartAsCalendarDate;
                    for (i = projectDurationAsHours, j = 0; i >= 0; i--, j++) {
                        if (Moment(hour, 'h').format('hh:mm') == dayEndAsHour) {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                            hour = Moment(hour, 'h').add(23 - (dayDuration/3600), 'h');
                        } else {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                        }
                    }
                    for (i = projectDurationAsDays, j = 0; i >= 0; i--, j++) {
                        topDates[j] = Moment(date, 'DD/MM/YY').format('DD/MM/YY');
                        date = Moment(date, 'DD/MM/YY').add(1, 'd');
                    }
                }
                // bottomDates are dates | topDates are weeks
                if (hourLength >= 6 && hourLength < 48) {
                    var date = projectStartAsCalendarDate,
                        week = projectStartAsWeekStartDate;
                    if(hourLength <= 12) {
                        var weekDays = Moment.weekdaysMin(),
                            dayOfWeek = Moment(projectStartUnix).day();
                        for (i = projectDurationAsDays, j = 0; i >= 0; i--, j++) {
                            bottomDates[j] = weekDays[dayOfWeek];
                            dayOfWeek++;
                            if(dayOfWeek == 7) {
                                dayOfWeek = 0;
                            }
                        }
                    } else {
                        for (i = projectDurationAsDays, j = 0; i >= 0; i--, j++) {
                            bottomDates[j] = Moment(date, 'DD/MM/YY').format('DD/MM/YY');
                            date = Moment(date, 'DD/MM/YY').add(1, 'd');
                        }
                    }
                    for (i = projectDurationAsWeeks, j = 0; i > 0; i--, j++) {
                        topDates[j] = Moment(week).format('MMMM Do YYYY');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                }
                // bottomDates are week | topDates are month
                if (hourLength > 75/100 && hourLength < 6) {
                    var week = projectStartAsWeekStartDate,
                        month = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsWeeks, j = 0; i > 0; i--, j++) {
                        bottomDates[j] = Moment(week).format('MMMM Do YYYY');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                    for (i = projectDurationAsMonths, j = 0; i > 0; i--, j++) {
                        topDates[j] = Moment(month).format('MMMM');
                        month = Moment(month, 'm').add(1, 'm');
                    }
                }
                // bottomDates are month | topDates are year
                if (hourLength <= 75/100) {
                    var month = Moment(projectStartUnix, 's'),
                        year = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsMonths, j = 0; i > 0; i--, j++) {
                        bottomDates[j] = Moment(month).format('MMMM');
                        month = Moment(month, 'm').add(1, 'm');
                    }
                    for (i = projectDurationAsYears, j = 0; i > 0; i--, j++) {
                        topDates[j] = Moment(year).format('YYYY');
                        year = Moment(year, 'y').add(1, 'y');
                    }
                }
            },

            renderTaskRows: function () {
                var task = null,
                    lastElem = this.$el.find('.gantt-date-header');
                for (var i = 0; i < this.tasksPositions.length; i++) {
                    task = this.tasksPositions[i];
                    this.ganttTaskRowView = new GanttTaskRowView({tasks: this.tasks, task: task}).render();
                    $(this.ganttTaskRowView.$el).insertAfter(lastElem);
                    lastElem = this.$el.find('.gantt-task-row:last');
                }
            }

        });

        return GanttChartView;
    });