/**
 * Created by Hazard on 26.01.2017.
 */
define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
        'use strict';

        var TasksListMobileView = Backbone.View.extend({
            template: JST['project:tasksListMobile'],
            className: 'mobile-tasks-list',
            events: {
                'click .tasks-list-item': 'onSelectTask'
            },


            initialize: function (options) {
                this.model = options.model;
                this.task = options.task;
            },

            render: function render() {
                this.tasks = this.model.get('tasks');
                this.$el.html(this.template({tasks: this.tasks}));

                return this;
            },

            onSelectTask: function onSelectTask(e) {
                var taskId = this.getTargetId(e);
                var task;
                for (var i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == taskId) {
                        task = this.tasks[i];
                    }
                }
                this.trigger('showTaskInfo', task);

            },

            getTargetId: function getTargetId(e) {
                var target = $(e.currentTarget);

                return target.data('id');
            }

        });

        return TasksListMobileView;
    });


