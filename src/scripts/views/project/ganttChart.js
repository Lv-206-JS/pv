define([
    'backbone',
    'JST',
    'moment',
    'timeLine',
    'views/project/ganttTasksSvg',
    'Snap'
    ], function (Backbone, JST, Moment, TimeLineLib, GanttTasks, Snap) {
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
                this.hourLength = options.hourLength;
                this.timeLine = new TimeLineLib(this.model);
                this.rowHeight = 40;
                this.padding = 20;
            },

            render: function render() {
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                if ((this.model.attributes.startDate != null && this.settings.dayDuration != 0)
                    && this.settings.hasOwnProperty('dayStart') != null) {
                    this.createGanttChartDateHeader();
                }
                if (this.tasks != 0) {
                    this.renderTasks();
                }
                return this;
            },

            createGanttChartDateHeader: function () {
                var topDates = [],
                    bottomDates = [];
                this.getGanttChartDates(topDates, bottomDates);
                this.drawGanttChartDateHeader(topDates, bottomDates);
            },

            getGanttChartDates: function (topDates, bottomDates) {
                var i, j,
                    projectStart = this.timeLine.toDate(0),
                    projectStartUnix = Moment.unix(projectStart),
                    dayStartAsHour = Moment(projectStartUnix, 's').format('hh:mm'),
                    dayEndAsHour =  Moment(projectStartUnix, 's').add(this.dayDuration/3600, 'h').format('hh:mm'),
                    projectStartAsCalendarDate =  Moment(projectStartUnix, 's').format('DD/MM/YY'),
                    weekStartDate = Moment(projectStartUnix, 's').startOf('week'),
                    projectStartAsWeekStartDate = Moment(weekStartDate, 's').add(1, 'd'),
                    projectDuration = this.timeLine.calculateEstimateTime(),
                    projectDurationUnix = this.timeLine.toDate(projectDuration) - this.timeLine.toDate(0),
                    projectDurationAsHours = Moment.duration(projectDurationUnix, 's').asHours(),
                    projectDurationAsDays = Math.floor(Moment.duration(projectDurationUnix, 's').asDays()),
                    projectDurationAsWeeks = Math.ceil(Moment.duration(projectDurationUnix, 's').asWeeks()),
                    projectDurationAsMonths = Math.ceil(Moment.duration(projectDurationUnix, 's').asMonths()),
                    projectDurationAsYears = Math.ceil(Moment.duration(projectDurationUnix, 's').asYears()),
                    weeksInMonth = 4,
                    daysInMonth = 30,
                    monthsInYear = 12;

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
                        week = projectStartAsWeekStartDate,
                        dayWidth = this.hourLength * this.dayDuration / 3600;
                    if(dayWidth < 70) {
                        var weekDays = Moment.weekdaysMin(),
                            dayOfWeek = Moment(projectStartUnix).day();
                        for (i = projectDurationAsDays < (daysInMonth * 2) ? (daysInMonth * 2) : projectDurationAsDays, j = 0;
                             i >= 0;
                             i--, j++) {
                            bottomDates[j] = weekDays[dayOfWeek];
                            dayOfWeek++;
                            if(dayOfWeek == 7) {
                                dayOfWeek = 0;
                            }
                        }
                    } else {
                        for (i = projectDurationAsDays < (daysInMonth * 2) ? (daysInMonth * 2) : projectDurationAsDays, j = 0;
                             i >= 0;
                             i--, j++) {
                            bottomDates[j] = Moment(date, 'DD/MM/YY').format('DD/MM/YY');
                            date = Moment(date, 'DD/MM/YY').add(1, 'd');
                        }
                    }
                    for (i = projectDurationAsWeeks < (weeksInMonth * 2) ? (weeksInMonth * 2) : projectDurationAsWeeks, j = 0;
                         i > 0; i--, j++) {
                        topDates[j] = Moment(week).format('MMM') + " "
                            + Moment(week).format('Do') + " - "
                            + Moment(week).add(6, 'd').format('Do') + " "
                            + Moment(week).format('YYYY');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                }
                // bottomDates are week | topDates are month
                if (this.hourLength > 15/10 && this.hourLength < 6) {
                    var week = projectStartAsWeekStartDate,
                        month = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsWeeks < weeksInMonth * 12 ? weeksInMonth * 12 : projectDurationAsWeeks, j = 0;
                         i > 0;
                         i--, j++) {
                        bottomDates[j] = Moment(week).format('ddd Do');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                    for (i = projectDurationAsMonths < monthsInYear ? monthsInYear : projectDurationAsMonths, j = 0;
                         i > 0;
                         i--, j++) {
                        topDates[j] = Moment(month).format('MMMM YYYY');
                        month = Moment(month, 'M').add(1, 'M');
                    }
                }
                // bottomDates are month | topDates are year
                if (this.hourLength <= 15/10) {
                    var month = Moment(projectStartUnix, 's'),
                        year = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsMonths < monthsInYear * 5 ? monthsInYear * 5 : projectDurationAsMonths, j = 0;
                         i > 0;
                         i--, j++) {
                        bottomDates[j] = this.hourLength >= 75/100 ? Moment(month).format('MMMM') : Moment(month).format('MMM');
                        month = Moment(month, 'M').add(1, 'M');
                    }
                    for (i = projectDurationAsYears < 5 ? 5 : projectDurationAsYears, j = 0; i > 0; i--, j++) {
                        topDates[j] = Moment(year).format('YYYY');
                        year = Moment(year, 'y').add(1, 'y');
                    }
                }
            },

            drawGanttChartDateHeader: function (topDates, bottomDates) {
                $(document).ready(function () {
                    var dayWidth = this.hourLength * this.dayDuration / 3600,
                        weekWidth = dayWidth * 5, // TODO get working days length instead of '5',
                        monthWidth = 21, // TODO calculate working days in month
                        yearWidth = dayWidth * 21 * 12,
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
                        this.drawVerticalDateLines(bottomW, rowHeight);

                    }
                    // bottomDates are dates | topDates are weeks
                    if (this.hourLength >= 6 && this.hourLength < 48) {
                        bottomW = dayWidth;
                        //ckeck for project start day
                        var projectStartDay = Moment(bottomDates[0],'dd').format('E');
                        // if day isn't Mon or weekend, adjust top width of 1st date rectangle
                        if(projectStartDay > 1 && projectStartDay < 6 ) {
                            topW = [];
                            topW[0] = dayWidth * (7 - projectStartDay + 1);
                            if(topW[0] <= dayWidth * 3) {
                                topDates[0] = "";
                            }
                            for (var i = 1; i < bottomDates.length - 1; i++) {
                                topW[i] = dayWidth * 7;
                            }
                        } else {
                            topW = dayWidth * 7;
                        }
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                        this.drawVerticalDateLines(bottomW, rowHeight);
                    }
                    // bottomDates are week | topDates are month
                    if (this.hourLength > 15/10 && this.hourLength < 6) {
                        bottomW = weekWidth;
                        // check project start date, adjust top width of 1st date rectangle
                        var projectStartDate = Moment(bottomDates[0], 'ddd Do').format('D');
                        topW = [];
                        // count width of the month as days * number of days left
                        topW[0] = dayWidth * (Moment(topDates[0], 'MMMM-YYYY').daysInMonth() - projectStartDate);
                        if(topW[0] <= bottomW) {
                            topDates[0] = "";
                        }
                        for (var i = 1; i < bottomDates.length - 1; i++) {
                            topW[i] = monthWidth * dayWidth;
                        }
                        // counting each month has 30 days gives a decent fault compare to getMonthWidth
                        // topW = this.getMonthWidth(dayWidth);
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                        this.drawVerticalDateLines(bottomW, rowHeight);

                    }
                    // bottomDates are month | topDates are year
                    if (this.hourLength <= 15/10) {
                        // counting each month has 30 days gives a decent fault compare to getMonthWidth
                        // bottomW = this.getMonthWidth(dayWidth);
                        bottomW = monthWidth * dayWidth;
                        topW = this.getYearWidth(bottomDates, bottomW);
                        this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, rowHeight, header, top, bottom);
                        this.drawVerticalDateLines(bottomW, rowHeight);
                    }
                }.bind(this));
            },

            drawGanttChartDateHeaderSVG:
                function (topDates,bottomDates,topW,bottomW,rowHeight,header,top,bottom) {
                    var rect, text, g, i, j, positionX;
                    if(bottomW.length > 1) {
                        for (i = 0, j = 0, positionX = 0; i < bottomDates.length; i++, j++, positionX += bottomW[j]) {
                            rect = bottom.rect(positionX, rowHeight, bottomW[j], rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
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
                        for (i = 0, positionX = 0; i < bottomDates.length; i++, positionX += bottomW){
                            rect = bottom.rect(positionX, rowHeight, bottomW, rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
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
                        for (i = 0, j = 0, positionX = 0; i < topDates.length; positionX += topW[j], i++, j++) {
                            rect = top.rect(positionX, 0, topW[j], rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
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
                        for (i = 0, positionX = 0; i < topDates.length; i++, positionX += topW) {
                            rect = top.rect(positionX, 0, topW, rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
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
                        }
                    }
                    // get width of the date header
                    var topWidth = topW.length > 0 ? topW[topW.length-2] : topW;
                    var dateWidth = topWidth + positionX;
                    dateWidth = (dateWidth > $(window).width()) ? $(window).width() : dateWidth;
                    dateWidth = (dateWidth % topWidth) == 0 ? dateWidth : dateWidth - (dateWidth % topWidth) + topWidth;
                    $('#dates').css('width', dateWidth);
                    //group top and bottom elements of date header
                    g = header.g(top, bottom);
            },

            drawVerticalDateLines: function (dateWidth,rowHeight) {
                var headerWidth = parseInt($('#dates').css('width'), 10),
                    projectWidth = this.getProjectWidth(),
                    width = projectWidth < headerWidth ? headerWidth : projectWidth,
                    height = this.tasks.length * rowHeight,
                    paper = Snap('#gantt-chart-svg'),
                    line;
                for (var col = 0; col < width; col += dateWidth) {
                    line = paper.line(col + dateWidth, 0, col + dateWidth, height);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                }
            },

            getProjectWidth: function () {
                var positionsLength = this.tasksPositions.length,
                    lastTaskLength = this.tasksPositions[positionsLength-1].singleTaskPositions.length,
                    positionX = this.tasksPositions[positionsLength-1].singleTaskPositions[lastTaskLength-1].positionX,
                    width = this.tasksPositions[positionsLength-1].singleTaskPositions[lastTaskLength-1].width,
                    lastTaskName = this.tasks[this.tasks.length - 1].name;
                var ganttWidth = positionX + width + this.padding + lastTaskName.length * 10;
                ganttWidth = (ganttWidth < $(window).width()) ? $(window).width() : ganttWidth;
                return ganttWidth;
            },

            getYearWidth: function(bottomDates, bottomW) {
                var topW = [];
                for (var mnth = 0, year = 0; mnth < bottomDates.length; mnth++) {
                    topW[year] = topW[year] === undefined ? bottomW : topW[year] + bottomW;
                    if(Moment().month(bottomDates[mnth]).format("M") == 12) {
                        year++
                    }
                }
                return topW;
            },

            getMonthWidth: function (dayWidth) {
                var i, j,
                    monthWidth = [],
                    projectStart = this.timeLine.toDate(0), // in unixstamp
                    month = Moment.unix(projectStart), // in unix
                    projectDuration = this.timeLine.calculateEstimateTime(),
                    projectDurationUnix = this.timeLine.toDate(projectDuration) - this.timeLine.toDate(0), // in unix
                    projectDurationAsMonths = Math.ceil(Moment.duration(projectDurationUnix, 's').asMonths());

                for (i = projectDurationAsMonths < 12 * 5 ? 12 * 5 : projectDurationAsMonths, j = 0;
                     i > 0;
                     i--, j++) {
                    monthWidth[j] = Moment(month, 'YYYY-MM').daysInMonth();
                    monthWidth[j] *= dayWidth;
                    month = Moment(month, 'm').add(1, 'm');
                }
                return monthWidth;
            },

            renderTasks: function () {
                this.ganttTasks = new GanttTasks({
                    tasks: this.tasks,
                    tasksPositions: this.tasksPositions
                }).render();

                var lastElem = this.$el.find('.gantt-date-header');
                $(this.ganttTasks.$el).insertAfter(lastElem);

                this.ganttTasks.drawTasksSvg();
            }

        });

        return GanttChartView;
    });