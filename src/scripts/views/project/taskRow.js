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
                this.tasks = options.model.get("tasks");
                this.task = options.task;
                this.moment = Moment;
                this.timeLine = new TimeLine(this.model);
                // convert dates from PTL to unix
                this.estimateTime = this.moment.duration(this.task.estimateTime, 'seconds').asHours();
                this.startDate = Number(this.task.startDate);
                this.startDate = this.timeLine.toDate(this.startDate);
                this.startDate = this.moment.unix(this.startDate, 's').format('DD/MM/YY');
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