define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST, TaskView) {
        'use strict';

        var TasksListView = Backbone.View.extend({
            template: JST['project:tasksList'],
            className: 'tasks-list-container',

            events: {
                'click .add-task': 'onTaskAdd',
                'dblclick .task-name': 'onTaskEdit',
                'mousedown .splitter': 'splitterMove'
            },

            initialize: function (options) {
                this.tasks = options.tasks;
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
                this.taskView = new TaskView({tasks: this.tasks, task: task}).render();
                this.$el.append(this.taskView.$el);

                return this;
            },

            renderTaskAddView: function () {
                this.taskView = new TaskView({tasks: this.tasks}).render();
                this.$el.append(this.taskView.$el);
            },

            onTaskEdit: function onTaskEdit(e) {
                var target = $(e.currentTarget);
                var taskId = target["0"].id;
                this.renderTaskView(taskId);
            },

            onTaskAdd: function onTaskAdd() {
                this.renderTaskAddView();
            },

            splitterMove: function () {
                var min = 200;
                var max = 3600;
                var minwidth = 400;

                $('.splitter').mousedown(function (e) {
                    e.preventDefault();
                    $(document).mousemove(function (e) {
                        e.preventDefault();
                        var x = e.pageX;
                        //var w = parseInt($('.splitter').css("width"));
                        if (x > min && x < max && e.pageX < ($(window).width() - minwidth)) {
                            $('.left-panel').css("width", x);
                            $('.right-panel').css("left", x);
                            $('.right-panel').css("width", $(window).width() - x);
                        }
                    })
                });
                $(document).mouseup(function (e) {
                    $(document).unbind('mousemove');
                });
            }

        });

        return TasksListView;
    });