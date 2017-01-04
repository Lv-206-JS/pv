define([
    'backbone',
    'JST',
    'moment',
    'timeLine',
    'views/project/ganttTaskRow',
    'Snap'
    ], function (Backbone, JST, Moment, TimeLineLib, GanttTaskRowView, Snap) {
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
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.createGanttChartDateHeader();
                this.renderTaskRows();
                this.scrollMove();
                return this;
            },

            scrollMove: function() {
                //TODO make it work faster
                $('#gantt-chart-container').scroll(function() {
                    var scrollPos = $('#gantt-chart-container').scrollTop();
                    $('#task-container').scrollTop(scrollPos);
                });
                $('#task-container').scroll(function() {
                    var scrollPos = $('#task-container').scrollTop();
                    $('#gantt-chart-container').scrollTop(scrollPos);
                });
            },

            createGanttChartDateHeader: function () {
                var topDates = [],
                    bottomDates = [];
                this.getGanttChartDates(topDates, bottomDates);
                this.drawGanttChartDateHeader(topDates, bottomDates);
            },

            getGanttChartDates: function (topDates, bottomDates) {
                var i, j,
                    projectStart = this.timeLine.toDate(0), // in unixstamp
                    projectStartUnix = Moment.unix(projectStart), // in unix
                    dayStartAsHour = Moment(projectStartUnix, 's').format('hh:mm'),
                    dayEndAsHour =  Moment(projectStartUnix, 's').add(this.dayDuration/3600, 'h').format('hh:mm'),
                    projectStartAsCalendarDate =  Moment(projectStartUnix, 's').format('DD/MM/YY'),
                    weekStartDate = Moment(projectStartUnix, 's').startOf('week'),
                    projectStartAsWeekStartDate = Moment(weekStartDate, 's').add(1, 'd'),
                    projectDuration = this.timeLine.calculateEstimateTime(),
                    projectDurationUnix = this.timeLine.toDate(projectDuration) - this.timeLine.toDate(0), // in unix
                    projectDurationAsHours = Moment.duration(projectDurationUnix, 's').asHours(),
                    projectDurationAsDays = Math.floor(Moment.duration(projectDurationUnix, 's').asDays()),
                    projectDurationAsWeeks = Math.ceil(Moment.duration(projectDurationUnix, 's').asWeeks()),
                    projectDurationAsMonths = Math.ceil(Moment.duration(projectDurationUnix, 's').asMonths()),
                    projectDurationAsYears = Math.ceil(Moment.duration(projectDurationUnix, 's').asYears());

                // bottomDates are hours | topDates are days
                if (this.hourLength >= 48) {
                    var hour = dayStartAsHour,
                        date = projectStartAsCalendarDate;
                    for (i = projectDurationAsHours, j = 0; i >= 0; i--, j++) {
                        if (Moment(hour, 'h').format('hh:mm') == dayEndAsHour) {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                            hour = Moment(hour, 'h').add(23 - (this.dayDuration/3600), 'h');
                        } else {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                        }
                    }
                    for (i = projectDurationAsDays, j = 0; i >= 0; i--, j++) {
                        var weekDay;
                        topDates[j] = Moment(date, 'DD/MM/YY').format('DD/MM/YY');
                        date = Moment(date, 'DD/MM/YY').add(1, 'd');
                        //check if date is weekend
                        weekDay = Moment(date,'seconds').format('e');
                        if (weekDay == 0) {
                            date = Moment(date, 'DD/MM/YY').add(1, 'd');
                        }
                        if (weekDay == 6) {
                            date = Moment(date, 'DD/MM/YY').add(2, 'd');
                        }
                    }
                }
                // bottomDates are dates | topDates are weeks
                if (this.hourLength >= 6 && this.hourLength < 48) {
                    var date = projectStartAsCalendarDate,
                        week = projectStartAsWeekStartDate;
                    if(this.hourLength <= 12) {
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
                if (this.hourLength > 15/10 && this.hourLength < 6) {
                    var week = projectStartAsWeekStartDate,
                        month = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsWeeks, j = 0; i > 0; i--, j++) {
                        bottomDates[j] = Moment(week).format('ddd Do');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                    for (i = projectDurationAsMonths, j = 0; i > 0; i--, j++) {
                        topDates[j] = Moment(month).format('MMMM YYYY');
                        month = Moment(month, 'm').add(1, 'm');
                    }
                }
                // bottomDates are month | topDates are year
                if (this.hourLength <= 15/10) {
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

            drawGanttChartDateHeader: function (topDates, bottomDates) {
                $(document).ready(function () {
                    var dayWidth = this.hourLength * this.dayDuration / 3600,
                        weekWidth = dayWidth * 7,
                        yearWidth = dayWidth * 365,
                        rowHeight = 40,
                        topW = null,
                        bottomW = null,
                        //get svg from the template
                        header = Snap('#dates'),
                        top = Snap("#topDates"),
                        bottom = Snap("#bottomDates");

                    // bottomDates are hours | topDates are days
                    if (this.hourLength >= 48) {
                        topW = dayWidth;
                        // adjust width of hour to include first and last hour
                        bottomW = this.hourLength - this.hourLength / (this.dayDuration / 3600 + 1);
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                    }
                    // bottomDates are dates | topDates are weeks
                    if (this.hourLength >= 6 && this.hourLength < 48) {
                        topW = weekWidth;
                        bottomW = dayWidth;
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                    }
                    // bottomDates are week | topDates are month
                    if (this.hourLength > 15/10 && this.hourLength < 6) {
                        topW = this.getMonthWidth(dayWidth);
                        bottomW = weekWidth;
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                    }
                    // bottomDates are month | topDates are year
                    if (this.hourLength <= 15/10) {
                        bottomW = this.getMonthWidth(dayWidth);
                        topW = bottomDates.length * bottomW;
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                    }
                }.bind(this));
            },

            drawGanttChartDateHeaderSVG:
                function (topDates,bottomDates,topW,bottomW,rowHeight,header,top,bottom) {
                    var rect, text, g, i, j, positionX;
                    if(bottomW.length > 1) {
                        j = i;
                        for (i = 0, j = 0, positionX = 0; i < bottomDates.length; i++, positionX += bottomW[j]) {
                            if(bottomW.length > 1) {
                                j = i;
                            }
                            rect = bottom.rect(positionX, rowHeight, bottomW[j], rowHeight);
                            rect.attr({
                                stroke: '#fff',
                                fill: '#fff'
                            });
                            text = bottom.text(positionX + bottomW[j]/2, rowHeight*1.5, bottomDates[i]);
                            text.attr({
                                fill: '#000',
                                'font-size': 14,
                                'text-anchor': 'middle',
                                'alignment-baseline': 'middle'
                            });
                            //group elements
                            g = bottom.g(rect, text);
                        }
                    } else {
                        for (i = 0, j = 0, positionX = 0; i < bottomDates.length; i++, positionX += bottomW){
                            if(bottomW.length > 1) {
                                j = i;
                            }
                            rect = bottom.rect(positionX, rowHeight, bottomW, rowHeight);
                            rect.attr({
                                stroke: '#fff',
                                fill: '#fff'
                            });
                            text = bottom.text(positionX + bottomW/2, rowHeight*1.5, bottomDates[i]);
                            text.attr({
                                fill: '#000',
                                'font-size': 14,
                                'text-anchor': 'middle',
                                'alignment-baseline': 'middle'
                            });
                            //group elements
                            g = bottom.g(rect, text);
                        }
                    }
                    if(topW.length > 1) {
                        j = i;
                        for (i = 0, j = 0, positionX = 0; i < topDates.length; i++, positionX += topW[j]) {
                            if(topW.length > 1) {
                                j = i;
                            }
                            rect = top.rect(positionX, 0, topW[j], rowHeight);
                            rect.attr({
                                stroke: '#fff',
                                fill: '#fff'
                            });
                            text = top.text(positionX + topW[j]/2, rowHeight/2, topDates[i]);
                            text.attr({
                                fill: '#000',
                                'font-size': 14,
                                'text-anchor': 'middle',
                                'alignment-baseline': 'middle'
                            });
                            //group elements
                            g = top.g(rect, text);
                        }
                    } else {
                        for (i = 0, j = 0, positionX = 0; i < topDates.length; i++, positionX += topW) {
                            if(topW.length > 1) {
                                j = i;
                            }
                            rect = top.rect(positionX, 0, topW, rowHeight);
                            rect.attr({
                                stroke: '#fff',
                                fill: '#fff'
                            });
                            text = top.text(positionX + topW/2, rowHeight/2, topDates[i]);
                            text.attr({
                                fill: '#000',
                                'font-size': 14,
                                'text-anchor': 'middle',
                                'alignment-baseline': 'middle'
                            });
                            //group elements
                            g = top.g(rect, text);
                        }                    }
                // group elements
                g = header.g(top, bottom);
            },

            getMonthWidth: function (dayWidth) {
                var i, j,
                    monthWidth = [],
                    projectStart = this.timeLine.toDate(0), // in unixstamp
                    month = Moment.unix(projectStart), // in unix
                    projectDuration = this.timeLine.calculateEstimateTime(),
                    projectDurationUnix = this.timeLine.toDate(projectDuration) - this.timeLine.toDate(0), // in unix
                    projectDurationAsMonths = Math.ceil(Moment.duration(projectDurationUnix, 's').asMonths());

                for (i = projectDurationAsMonths, j = 0; i > 0; i--, j++) {
                    monthWidth[j] = Moment(month, 'YYYY-MM').daysInMonth(); //.format('YYYY-MM')
                    monthWidth[j] *= dayWidth;
                    month = Moment(month, 'm').add(1, 'm');
                }
                return monthWidth;
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