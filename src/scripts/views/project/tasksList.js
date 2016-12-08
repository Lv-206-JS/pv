define([
        'backbone',
        'underscore',
        'JST'//,
        //'views/project/taskRow'
    ],
    function (Backbone, _, JST) { //, TaskRowView) {
        'use strict';

        var TasksListView = Backbone.View.extend({
            template: JST['project:tasksList'],
            id: 'tasks-list',

            events: {
                'click .add-task': 'onTaskAdd',
                'click .edit-task': 'onTaskEdit',
                'click .remove-task': 'onTaskRemove'
            },

            initialize: function (options) {
                this.model = options.model;
                this.tasks = this.model.get('tasks');
                //this.milestones = this.model.get('milestones');
            },

            render: function render() {
                this.$el.html(this.template({
                    tasks: this.tasks
                }));
                return this;
            },

            renderTaskView: function (id) {
                var task = null;
                for (var i = 0; !task && i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == id) {
                        task = this.tasks[i];
                    }
                }
                this.trigger('showTaskEditPopup', this.tasks, task);
                return this;
            },

            renderTaskAddView: function () {
                this.trigger('showTaskAddPopup', this.tasks);
            },

            onTaskEdit: function onTaskEdit(e) {
                var target = $(e.currentTarget);
                var taskId = target["0"].id;
                this.renderTaskView(taskId);
            },

            onTaskAdd: function onTaskAdd() {
                this.renderTaskAddView();
            },

            onTaskRemove : function onTaskRemove(e) {
                var target = $(e.currentTarget);
                var taskId = target["0"].id;
                for (var i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == taskId) {
                        break;
                    }
                }

                this.tasks.splice(i,1);
                this.model.set("tasks", this.tasks);
                this.model.save();
            }

        });

        return TasksListView;
    });