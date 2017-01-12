define([
        'backbone',
        'underscore',
        'JST',
        'Snap'
    ],
    function (Backbone, _, JST, Snap) {
        'use strict';

        var GanttTasksView = Backbone.View.extend({
            template: JST['project:ganttTaskRow'],
            className: 'gantt-chart-container-svg',
            tagName: 'div',

            initialize: function (options) {
                this.tasks = options.tasks;
                this.tasksPositions = options.tasksPositions;
                this.dayDuration = options.dayDuration;
                this.hourLength = options.hourLength;
                this.rowHeight = options.rowHeight;
                this.padding = options.padding;
                this.tasksNameIdPositions = [];
            },

            render: function () {
                this.$el.html(this.template({}));
                return this;
            },

            getTasksData: function () {
                // create arrays of tasks name, id and tasks positions for drawing svg
                for (var i = 0; i < this.tasksPositions.length; i++) {
                    this.tasksNameIdPositions[i] = {};
                    this.tasksNameIdPositions[i].name = this.findTaskById(this.tasksPositions[i].taskId).name;
                    this.tasksNameIdPositions[i].id = this.tasksPositions[i].taskId;
                    this.tasksNameIdPositions[i].taskPositions = this.tasksPositions[i].singleTaskPositions;
                }
                return this.tasksNameIdPositions;
            },

            drawTasksSvg: function () {
                this.getTasksData();
                var svgHeight = this.rowHeight * this.tasksPositions.length - 4,
                    rectHeight = this.rowHeight * 0.6,
                    positionX,
                    width,
                    task,
                    taskName,
                    ganttWidth;
                //get svg from the template
                var paper = Snap('#gantt-chart-svg');
                paper.attr({
                    'height': svgHeight
                });
                //row rectangle
                for (var row = 0, rect, line, positionY = 0;
                     row < this.tasksPositions.length;
                     row++, positionY += this.rowHeight) {

                    // draw rectangle to be a table row
                    rect = paper.rect(0, positionY, "100%", this.rowHeight);
                    rect.attr({
                        fill: 'rgba(0,0,0,0.0)',
                        class: 'table-task-row'
                    });
                    // draw horizontal line for row division
                    line = paper.line(0, positionY, "100%", positionY);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                    // draw task rectangle(s)
                    for (var part = 0; part < this.tasksNameIdPositions[row].taskPositions.length; part++) {
                        positionX = this.tasksNameIdPositions[row].taskPositions[part].positionX;
                        width = this.tasksNameIdPositions[row].taskPositions[part].width;
                        rect = paper.rect(positionX, positionY + (this.rowHeight - rectHeight) / 2, width, rectHeight);
                        rect.attr({
                            fill: "#28b463",
                            class: this.tasksPositions[row].taskId
                        });
                        // rect.prependTo(paper);
                    }
                    // check if task has name and show its name
                    taskName = (this.tasksNameIdPositions[row].name) ? this.tasksNameIdPositions[row].name : null;
                    if (taskName) {
                        var text = paper.text(positionX + width + this.padding, positionY + this.rowHeight / 2, taskName);
                        text.attr({
                            fill: '#000',
                            'font-size': 14,
                            'alignment-baseline': 'middle'
                        });
                    }
                }
                this.getGanttWidthHeight(svgHeight);
            },

            drawVerticalDateLines: function () {
                var dateWidth = this.getBottomDateWidth(),
                    projectWidth = this.getProjectWidth(),
                    width = projectWidth < $(window).width() ? $(window).width() : projectWidth,
                    height = this.tasks.length * this.rowHeight,
                    paper = Snap('#gantt-chart-svg'),
                    line;
                for (var col = 0; col < width; col += dateWidth) {
                    line = paper.line(col + dateWidth, 0, col + dateWidth, height);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                }
            },

            getGanttWidthHeight: function (svgHeight) {
                // set Gantt height
                $('.gantt-chart-container-svg').css('height', svgHeight);
                var projectWidth = this.getProjectWidth(),
                    ganttWidth = projectWidth < $(window).width() ? $(window).width() : projectWidth;
                $('.gantt-chart-container-svg').css('width', ganttWidth);
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

            getBottomDateWidth: function() {
                // adjust width of an hour to include first and last hour of the working time
                var hourWidth = this.hourLength - this.hourLength / (this.dayDuration / 3600 + 1),
                    dayWidth = this.hourLength * this.dayDuration / 3600,
                    weekWidth = dayWidth * 5, // TODO get working days length instead of '5',
                    monthWidth = 21; // TODO calculate working days in month
                if (this.hourLength >= 48) {
                    return hourWidth;
                }
                if (this.hourLength >= 6 && this.hourLength < 48) {
                    return dayWidth;
                }
                if (this.hourLength > 15/10 && this.hourLength < 6) {
                    return weekWidth;
                }
                if (this.hourLength <= 15/10) {
                    return monthWidth * dayWidth;
                }
            },

            findTaskById: function (id) {
                var task = null;
                for (var i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == id) {
                        task = this.tasks[i];
                        return task;
                    }
                }
            }

        });

        return GanttTasksView;
    });