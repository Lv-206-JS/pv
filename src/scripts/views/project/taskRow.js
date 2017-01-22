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
            className: 'table-task-row',

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.task = options.task;
                this.rowHeight = options.rowHeight;
                this.padding = options.padding;
                this.moment = Moment;
                this.timeLine = new TimeLine(this.model);
                // convert dates from PTL to unix
                this.estimateTime = this.moment.duration(this.task.estimateTime, 'seconds').asHours();
                this.startDate = Number(this.task.startDate);
                this.startDate = this.timeLine.toDate(this.startDate);
                this.startDate = this.moment.unix(this.startDate, 's').format('DD/MM/YY');
                this.el.id = options.task.taskId;
            },

            events: {
                'click .cell-task': 'scrollGanttChart'
                // 'click .table-cell-task': 'initClick',
                // 'click .table-cell': 'initClick'
                // 'click .table-task-row': 'scrollGanttChart'
            },

            initClick: function () {
                event.initEvent("click", true, false);
            },

            scrollGanttChart: function (event) {
                var taskId = event.target.id;
                // var taskId = event.target.className.value; // for .table-task-row
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