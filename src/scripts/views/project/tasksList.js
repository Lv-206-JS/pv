define([
                'backbone',
                'underscore',
                'JST',
                'views/project/taskRow'
            ],
            function (Backbone, _, JST, TaskRowView) {
                'use strict';

                var TasksListView = Backbone.View.extend({
                    template: JST['project:tasksList'],
                    id: 'tasks-list',

            events: {
                'click .add-task': 'onTaskAdd',
                'click .icon-edit': 'onTaskEdit',
                'dblclick .cell-task': 'onTaskEdit',
                'click .icon-remove': 'onTaskRemove' //TODO Delete from here -> Move to tasks.js
            },

            initialize: function (options) {
                this.model = options.model;
                this.tasks = this.model.get('tasks');
            },

            render: function render() {
                this.$el.html(this.template({
                    tasks: this.tasks
                }));
                this.renderTaskRows();
                return this;
            },

            renderTaskRows: function () {
                var task = null;
                var lastElem = this.$el.find('.table-task-header');
                for (var i = 0; i < this.tasks.length; i++) {
                    task = this.tasks[i];
                    this.taskRowView = new TaskRowView({tasks: this.tasks, task: task}).render();
                    $(this.taskRowView.$el).insertAfter(lastElem);
                    lastElem = this.$el.find('.table-task-row:last');
                }
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
            //TODO Delete from here -> Move to tasks.js
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