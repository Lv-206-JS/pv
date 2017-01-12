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
                this.tasksPositionWidth = options.tasksPositions;
            },

            render: function () {
                this.$el.html(this.template({}));
                return this;
            },

            drawTasksSvg: function () {
                // create arrays of tasks, tasks id and tasks positions for svg
                for (var i = 0, tasks = [], classes = [], tasksPositions = []; i < this.tasksPositionWidth.length; i++) {
                    tasks[i] = this.findTaskById(this.tasks, this.tasksPositionWidth[i].taskId);
                    classes[i] = this.tasksPositionWidth[i].taskId;
                    tasksPositions[i] = this.tasksPositionWidth[i].singleTaskPositions;
                }

                var positionX,
                    width,
                    rowHeight = 40,
                    svgHeight = rowHeight * this.tasksPositionWidth.length - 4,
                    rectHeight = rowHeight * 0.6,
                    padding = 20,
                    task,
                    taskName,
                    ganttWidth;
                //get svg from the template
                var paper = Snap('#gantt-chart-svg');
                paper.attr({
                    'height': svgHeight
                });
                //row rectangle
                for (var row = 0, rect = null, line = null, positionY = 0;
                     row < this.tasksPositionWidth.length;
                     row++, positionY += rowHeight) {
                    rect = paper.rect(0, positionY, "100%", rowHeight);
                    rect.attr({
                        fill: 'rgba(0,0,0,0.0)',
                        class: 'table-task-row'
                    });
                    line = paper.line(0, positionY, "100%", positionY);
                    line.attr({
                        stroke: 'rgba(0, 0, 0, 0.12)'
                    });
                    // task rectangle
                    for (var part = 0; part < tasksPositions[row].length; part++) {
                        positionX = tasksPositions[row][part].positionX;
                        width = tasksPositions[row][part].width;
                        rect = paper.rect(positionX, positionY + (rowHeight - rectHeight) / 2, width, rectHeight);
                        rect.attr({
                            fill: "#28b463",
                            class: this.tasksPositionWidth[row].taskId
                        });
                    }
                    task = this.findTaskById(this.tasks, this.tasksPositionWidth[row].taskId);
                    taskName = (task.name) ? task.name : null;
                    // show task name
                    if (taskName) {
                        var text = paper.text(positionX + width + padding, positionY + rowHeight / 2, taskName);
                        text.attr({
                            fill: '#000',
                            'font-size': 14,
                            'alignment-baseline': 'middle'
                        });
                        //get min-width of gantt chart div
                        ganttWidth = positionX + width + padding + taskName.length * 10;
                    }
                }
                $('.gantt-chart-container-svg').css('height', svgHeight);
                var datesWidth = parseInt($('#dates').css('width'), 10);
                // if gantt width is larger than datesWidth, make both equal gantt width
                if (ganttWidth < datesWidth) {
                    ganttWidth = datesWidth;
                } else {
                    $('#dates').css('width', ganttWidth);
                }
                $('.gantt-chart-container-svg').css('width', ganttWidth);
            },

            findTaskById: function (tasks, id) {
                var task = null;
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].taskId == id) {
                        task = tasks[i];
                        return task;
                    }
                }
            }

        });

        return GanttTasksView;
    });