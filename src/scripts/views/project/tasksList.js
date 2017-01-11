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
                'dblclick .cell-task': 'onTaskEdit'
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
                    this.taskRowView = new TaskRowView({
                        model: this.model,
                        task: task
                    }).render();
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
                var taskId = target['0'].id;
                this.renderTaskView(taskId);
            },

            onTaskAdd: function onTaskAdd() {
                this.renderTaskAddView();
            }

        });

        return TasksListView;
    });