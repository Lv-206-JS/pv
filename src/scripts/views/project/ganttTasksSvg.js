define([
        'backbone',
        'underscore',
        'JST',
        'Snap',
        'moment',
        'views/project/taskInfo'
    ],
    function (Backbone, _, JST, Snap, Moment, TaskInfoView) {
        'use strict';

        var GanttTasksView = Backbone.View.extend({
            template: JST['project:ganttTaskRow'],
            className: 'gantt-chart-container-svg',

            initialize: function (options) {
                this.model = options.model;
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
                var svgHeight = this.getGanttHeight(),
                    rectHeight = this.rowHeight * 0.6,
                    positionY = 0,
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
                var ganttChartElem = document.getElementById('gantt-chart-container');
                ganttChartElem.addEventListener('click', this.hideTaskInfo.bind(this));

                this.getTasksData();

                //row rectangle
                for (var row = 0, rect;
                     row < this.tasksPositions.length;
                     row++, positionY += this.rowHeight) {

                    // draw rectangle to be a table row
                    rect = paper.rect(0, positionY, "100%", this.rowHeight);
                    rect.attr({
                        fill: 'rgba(0,0,0,0.0)',
                        class: 'table-task-row'
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
                        // if($('.'+this.tasksPositions[row].taskId).hasClass('critical')) {
                        //     rect.attr({
                        //         fill: "#d80027"
                        //     });
                        // }
                        var rectElem = document.getElementsByClassName(this.tasksPositions[row].taskId)[part];
                        rectElem.addEventListener('click', this.showTaskInfo.bind(this), true);
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
                this.getGanttWidth();
            },

            showTaskInfo: function (event) {
                event.stopPropagation();
                var taskId = event.target.classList.value;

                //remove active class and style from currently active task
                var activeTask = $('.active-task');
                activeTask.css('fill', '#28b463');
                activeTask.removeClass('active-task');

                //change style of current task
                $('.'+taskId).addClass('active-task');
                $('.'+taskId).css('fill', '#2980b9');

                //hide info-bar-view
                $('#info-bar-view-container').css('display', 'none');

                var task = this.findTaskById(taskId);
                var taskInfo = new TaskInfoView({
                    model: this.model,
                    task: task,
                    el: $('#task-info-view-container')[0]
                }).render();

                //show task-info-view
                $('#task-info-view').css('display', 'flex');
            },

            hideTaskInfo: function () {
                var taskId = event.target.classList.value;

                //remove active class and style from currently active task
                var activeTask = $('.active-task');
                activeTask.css('fill', '#28b463');
                activeTask.removeClass('active-task');

                $('#task-info-view').css('display', 'none');
                $('#info-bar-view-container').css('display', 'flex');
            },

            drawVerticalDateLines: function () {
                var dateWidth = this.getBottomDateWidth(),
                    projectWidth = this.getGanttWidth(),
                    width = projectWidth + dateWidth,
                    ganttChartHeight = parseInt($('#gantt-view-container').css('height'), 10),
                    tasksHeight = this.tasks.length*this.rowHeight,
                    lineHeight = tasksHeight > ganttChartHeight ? tasksHeight : ganttChartHeight,
                    paper = Snap('#gantt-chart-svg'),
                    line;
                for (var col = 0; col <= width; col += dateWidth) {
                    line = paper.line(col + dateWidth, 0, col + dateWidth, lineHeight);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                }
            },

            drawHorizontalLines: function (height) {
                var ganttHeight = this.getGanttHeight();
                var height = ganttHeight/this.rowHeight;
                var paper = Snap('#gantt-chart-svg');
                paper.attr({
                    'height': ganttHeight
                });
                for (var row = 0, rect, line, positionY = 0;
                     row <= height;
                     row++, positionY += this.rowHeight) {
                    // draw horizontal line for row division
                    line = paper.line(0, positionY, "100%", positionY);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                }
            },

            getGanttHeight: function () {
                var ganttChartHeight = parseInt($('#gantt-view-container').css('height'), 10) - this.rowHeight * 2,
                    tasksHeight = this.tasks.length * this.rowHeight,
                    height = tasksHeight > ganttChartHeight ? tasksHeight : ganttChartHeight,
                    height = height % this.rowHeight ? height - (height % this.rowHeight) : height;
                $('.gantt-chart-container-svg').css('height', height);
                return height;
            },

            getGanttWidth: function () {
                var dateWidth = this.getBottomDateWidth(),
                    projectWidth = this.getProjectWidth(),
                    ganttWidth = projectWidth < $(window).width() ? $(window).width() : projectWidth,
                    ganttWidth = (ganttWidth%dateWidth) ? ganttWidth-(ganttWidth%dateWidth)+dateWidth : ganttWidth;
                $('.gantt-chart-container-svg').css('width', ganttWidth);
                return ganttWidth;
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