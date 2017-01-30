define([
        'backbone',
        'underscore',
        'JST',
        'moment',
        'timeLine'
    ],
    function (Backbone, _, JST, Moment, TimeLine) {
        'use strict';

        var TaskRowView = Backbone.View.extend({
            template: JST['project:taskRow'],

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.task = options.task;
                this.rowHeight = options.rowHeight;
                this.padding = options.padding;
                this.timeLine = new TimeLine(this.model);
                // convert dates from PTL to unix
                this.estimateTime = Moment.duration(this.task.estimateTime, 'seconds').asHours();
                this.startDate = this.getStartDate(this.task.startDate);
                $('.table-task-row').data('dataTaskId', options.task.taskId)
            },

            events: {
                'click .table-task-row': 'scrollGanttChart'
            },

            getStartDate: function (startDate) {
                var startDate = startDate - 0;
                startDate = this.timeLine.toDate(startDate);
                startDate = Moment.unix(startDate, 's').format('DD/MM/YY');
                return startDate;
            },

            scrollGanttChart: function (event) {
                if (event.target.className === 'table-task-row') {
                    var taskId = event.target.attributes.data.value;
                }
                else {
                    var taskRow = event.target;
                    while(taskRow.className !== 'table-task-row') {
                        taskRow = taskRow.parentNode;
                    }
                    var taskId = taskRow.attributes.data.value;
                }
                var rect = document.getElementsByClassName(taskId)[0];
                var positionX = rect.x.baseVal.value;
                $('#gantt-chart-container').scrollLeft(positionX);
            },

            render: function () {
                this.$el.html(this.template({
                    tasks: this.tasks, task: this.task, estimateTime: this.estimateTime, startDate: this.startDate
                }));
                return this;
            }

        });

        return TaskRowView;
    });