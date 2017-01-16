define([
                'backbone',
                'underscore',
                'JST',
                'views/project/taskRow',
                'Snap'
            ],
            function (Backbone, _, JST, TaskRowView, Snap) {
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
                this.rowHeight = options.rowHeight;
                this.padding = options.padding;
            },

            render: function render() {
                this.$el.html(this.template({
                    tasks: this.tasks
                }));
                this.renderTaskRows();

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

            renderTaskRows: function () {
                var task = null,
                    lastElem = this.$el.find('.table-task-header'),
                    tasksHeight = Math.floor(this.getTasksHeight())/this.rowHeight,
                    tasksAmount = this.tasks.length,
                    additionalHeight = tasksHeight - tasksAmount - 1;
                for (var i = 0; i < tasksAmount; i++) {
                    task = this.tasks[i];
                    this.taskRowView = new TaskRowView({
                        model: this.model,
                        task: task,
                        rowHeight: this.rowHeight,
                        padding: this.padding
                    }).render();
                    $(this.taskRowView.$el).insertAfter(lastElem);
                    lastElem = this.$el.find('.table-task-row:last');
                }
                for (var i = 0, taskRow; i < additionalHeight; i++) {
                    taskRow = '<div class="table-task-row"></div>';
                    $(taskRow).insertAfter(lastElem);
                    lastElem = this.$el.find('.table-task-row:last');
                }
                return this;
            },

            getTasksHeight: function () {
                var ganttHeight = parseInt($('#gantt-view-container').css('height'), 10) - this.rowHeight * 2,
                    tasksHeight = this.tasks.length * this.rowHeight,
                    height = tasksHeight > ganttHeight ? tasksHeight : ganttHeight;
                return height;
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