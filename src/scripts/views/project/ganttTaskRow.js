define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
        'use strict';

        var GanttTaskRowView = Backbone.View.extend({
            template: JST['project:ganttTaskRow'],
            className: 'table-task-row',

            initialize: function (options) {
                this.tasks = options.tasks;
                this.task = options.task;
            },

            render: function () {
                this.$el.html(this.template({
                    tasks: this.tasks, task: this.task
                }));
                return this;
            }

        });

        return GanttTaskRowView;
    });