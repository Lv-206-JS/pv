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
                    model: this.model, tasks: this.tasks
                }));

                this.renderTasks();
                this.createGanttChartDateHeader();

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
                    hoursInDay = 24,
                    daysInWeek = 7,
                    weeksInMonth = 4,
                    daysInMonth = 30,
                    monthsInYear = 12;

                // bottomDates are hours | topDates are days
                if (this.hourLength >= 48) {
                    var hour = dayStartAsHour,
                        date = projectStartAsCalendarDate;
                    for (i = projectDurationAsHours<hoursInDay*4 ? hoursInDay*4 : projectDurationAsHours, j = 0;
                         i >= 0;
                         i--, j++) {
                        if (Moment(hour, 'h').format('hh:mm') == dayEndAsHour) {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                            hour = Moment(hour, 'h').add(23 - (this.dayDuration/3600), 'h');
                        } else {
                            bottomDates[j] = Moment(hour, 'h').format('hh:mm');
                            hour = Moment(hour, 'h').add(1, 'h');
                        }
                    }
                    for (i = projectDurationAsDays<daysInWeek*2 ? daysInWeek*2 : projectDurationAsDays, j = 0;
                         i >= 0;
                         i--, j++) {
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
                        for (i = projectDurationAsDays<(daysInMonth*2) ? (daysInMonth*2) : projectDurationAsDays, j = 0;
                             i >= 0;
                             i--, j++) {
                            bottomDates[j] = weekDays[dayOfWeek];
                            dayOfWeek++;
                            if(dayOfWeek == 7) {
                                dayOfWeek = 0;
                            }
                        }
                    } else {
                        for (i = projectDurationAsDays<(daysInMonth*2) ? (daysInMonth*2) : projectDurationAsDays, j = 0;
                             i >= 0;
                             i--, j++) {
                            bottomDates[j] = Moment(date, 'DD/MM/YY').format('DD/MM/YY');
                            date = Moment(date, 'DD/MM/YY').add(1, 'd');
                        }
                    }
                    for (i = projectDurationAsWeeks<(weeksInMonth*2) ? (weeksInMonth*2) : projectDurationAsWeeks, j = 0;
                         i > 0; i--, j++) {
                        topDates[j] = Moment(week).format('MMM') + " "
                            + Moment(week).format('Do') + " - "
                            + Moment(week).add(6, 'd').format('Do') + " "
                            + Moment(week).format('YYYY');
                        week = Moment(week, 'w').add(1, 'w');
                    }
                }
                // bottomDates are weeks | topDates are months
                if (this.hourLength > 15/10 && this.hourLength < 6) {
                    var week = projectStartAsWeekStartDate,
                        month = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsWeeks<(weeksInMonth*12) ? weeksInMonth*12 : projectDurationAsWeeks, j = 0;
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
                // bottomDates are months | topDates are years
                if (this.hourLength <= 15/10) {
                    var month = Moment(projectStartUnix, 's'),
                        year = Moment(projectStartUnix, 's');
                    for (i = projectDurationAsMonths<(monthsInYear*5) ? monthsInYear*5 : projectDurationAsMonths, j = 0;
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
                var hourWidth = this.hourLength - this.hourLength / (this.dayDuration / 3600 + 1),
                    dayWidth = this.hourLength * this.dayDuration / 3600,
                    weekWidth = dayWidth * 5, // TODO get working days length instead of '5',
                    monthWidth = 21, // TODO calculate working days in month
                    yearWidth = dayWidth * 21 * 12,
                    topW,
                    bottomW,
                    //get svg from the template
                    header = Snap('#dates'),
                    top = Snap("#topDates"),
                    bottom = Snap("#bottomDates");

                // bottomDates are hours | topDates are days
                if (this.hourLength >= 48) {
                    // adjust width of an hour to include first and last hour of the working time
                    bottomW = hourWidth;
                    topW = dayWidth;
                    this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, header, top, bottom);
                }
                // bottomDates are dates | topDates are weeks
                if (this.hourLength >= 6 && this.hourLength < 48) {
                    bottomW = dayWidth;
                    topW = this.adjustWeekWidth(bottomDates, dayWidth);
                    this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, header, top, bottom);
                }
                // bottomDates are week | topDates are month
                if (this.hourLength > 15/10 && this.hourLength < 6) {
                    bottomW = weekWidth;
                    topW = this.adjustMonthWidth(topDates, bottomDates, bottomW, monthWidth, dayWidth);
                    this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, header, top, bottom);
                }
                // bottomDates are month | topDates are year
                if (this.hourLength <= 15/10) {
                    bottomW = monthWidth * dayWidth;
                    topW = this.adjustYearWidth(bottomDates, bottomW);
                    this.drawGanttChartDateHeaderSVG(topDates, bottomDates, topW, bottomW, header, top, bottom);
                }
            },

            drawGanttChartDateHeaderSVG:
                function (topDates,bottomDates,topW,bottomW,header,top,bottom) {
                    var rect, text, g, i, j, positionX;
                    if(bottomW.length > 1) {
                        for (i = 0, j = 0, positionX = 0; i < bottomDates.length; i++, j++, positionX += bottomW[j]) {
                            rect = bottom.rect(positionX, this.rowHeight, bottomW[j], this.rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
                            });
                            text = bottom.text(positionX + bottomW[j]/2, this.rowHeight*1.5, bottomDates[i]);
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
                            rect = bottom.rect(positionX, this.rowHeight, bottomW, this.rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
                            });
                            text = bottom.text(positionX + bottomW/2, this.rowHeight*1.5, bottomDates[i]);
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
                            rect = top.rect(positionX, 0, topW[j], this.rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
                            });
                            text = top.text(positionX + topW[j]/2, this.rowHeight/2, topDates[i]);
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
                            rect = top.rect(positionX, 0, topW, this.rowHeight);
                            rect.attr({
                                stroke: 'rgba(0,0,0,0.0)',
                                fill: 'rgba(0,0,0,0.0)'
                            });
                            text = top.text(positionX + topW/2, this.rowHeight/2, topDates[i]);
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
                    this.getDateHeaderWidth(topW);
                    //group top and bottom elements of date header
                    g = header.g(top, bottom);
            },

            getProjectWidth: function () {
                if (this.tasksPositions.length === 0) {
                    return 0;
                }
                var lengths = [];
                for (var i = 0, length; i < this.tasksPositions.length; i++) {
                    length = this.tasksPositions[i].singleTaskPositions.length;
                    lengths[i] = this.tasksPositions[i].singleTaskPositions[length-1].positionX
                        + this.tasksPositions[i].singleTaskPositions[length-1].width;
                }
                var projectWidth = Math.max.apply(null, lengths);
                var taskIndex = lengths.indexOf(projectWidth);
                projectWidth += this.tasks[taskIndex].name.length * 10 + this.padding;
                return projectWidth;
            },

            getDateHeaderWidth: function (topDateWidth) {
                // var topWidth = topDateWidth.length > 0 ? topDateWidth[topDateWidth.length-2] : topDateWidth;
                var projectWidth = this.getProjectWidth();
                var width = projectWidth > $(window).width() ? projectWidth : $(window).width();
                    // width = (width % topWidth) == 0 ? width : width - (width % topWidth) + topWidth;
                $('#dates').css('width', width);
                $('.gantt-chart-container-svg').css('width', width);
            },

            adjustYearWidth: function(bottomDates, bottomW) {
                var topW = [];
                for (var mnth = 0, year = 0; mnth < bottomDates.length; mnth++) {
                    topW[year] = topW[year] === undefined ? bottomW : topW[year] + bottomW;
                    if(Moment().month(bottomDates[mnth]).format("M") == 12) {
                        year++
                    }
                }
                return topW;
            },

            adjustMonthWidth: function (topDates, bottomDates, bottomW, monthWidth, dayWidth) {
                // check project start date, adjust top width of 1st date rectangle
                var projectStartDate = Moment(bottomDates[0], 'ddd Do').format('D');
                var monthWidths = [];
                // count width of the month as days * number of days left
                monthWidths[0] = dayWidth * (Moment(topDates[0], 'MMMM-YYYY').daysInMonth() - projectStartDate);
                if(monthWidths[0] <= bottomW) {
                    topDates[0] = "";
                }
                for (var i = 1; i < bottomDates.length - 1; i++) {
                    monthWidths[i] = monthWidth * dayWidth;
                }
                return monthWidths;
            },

            adjustWeekWidth: function (bottomDates, dayWidth) {
                var weekWidths = [];
                //ckeck for project start day
                var projectStartDay = Moment(bottomDates[0],'dd').format('E');
                // if day isn't Mon or weekend, adjust top width of 1st date rectangle
                if(projectStartDay > 1 && projectStartDay < 6 ) {
                    weekWidths = [];
                    weekWidths[0] = dayWidth * (7 - projectStartDay + 1);
                    if(weekWidths[0] <= dayWidth * 3) {
                        topDates[0] = "";
                    }
                    for (var i = 1; i < bottomDates.length - 1; i++) {
                        weekWidths[i] = dayWidth * 7;
                    }
                } else {
                    weekWidths = dayWidth * 7;
                }
                return weekWidths;
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
                    tasksPositions: this.tasksPositions,
                    dayDuration: this.dayDuration,
                    hourLength: this.hourLength,
                    rowHeight: this.rowHeight,
                    padding: this.padding
                }).render();

                var lastElem = this.$el.find('.gantt-date-header');
                $(this.ganttTasks.$el).insertAfter(lastElem);

                this.ganttTasks.drawVerticalDateLines();
                this.ganttTasks.drawHorizontalLines();

                if (this.tasks.length > 0) {
                    this.ganttTasks.drawTasksSvg();
                }
            }

        });

        return GanttChartView;
    });