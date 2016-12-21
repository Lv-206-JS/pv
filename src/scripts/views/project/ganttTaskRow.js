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
                this.positionX = options.task.positionX;
                this.width = options.task.width;
                this.id = options.task.taskId;
                this.task = this.findTaskById(this.id);
            },

            render: function () {
                this.$el.html(this.template({
                    positionX: this.positionX, width: this.width
                }));
                return this;
            },

            findTaskById: function (id) {
                var task = null;
                for (var i = 0; !task && i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == id) {
                        task = this.tasks[i];
                        return task;
                    }
                }
            }

        });

        return GanttTaskRowView;
    });