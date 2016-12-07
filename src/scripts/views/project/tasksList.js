define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
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
                // this.model = options.model;
                this.tasks = options.tasks;
            },

            render: function render() {
                this.$el.html(this.template({
                    tasks: this.tasks
                }));

                 // var milestoneView = parseInt($('.milestone-view').css('height'), 10);
                 // var mainMenu = parseInt($('.main-menu').css('height'), 10);
                 // var maxHeight = (milestoneView && mainMenu) ? ($(document).height() - milestoneView - mainMenu) : null ;
                 // console.log(maxHeight);
                // $('.tasks-list-container').css('max-height', maxHeight);
                // console.log($('.tasks-list-container').css('max-height'));

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

            splitterMove: function () {
                var min = 200;
                var max = 3600;
                var minwidth = 200;

                $('.splitter').mousedown(function (e) {
                    e.preventDefault();
                    $(document).mousemove(function (e) {
                        e.preventDefault();
                        var x = e.pageX;
                        var w = parseInt($('.splitter').css("width"));
                        if (x > min && x < max && e.pageX < ($(window).width() - minwidth)) {
                            $('.left-panel').css("width", x);
                            $('.splitter').css("left", x);
                            $('.right-panel').css("left", x + w);
                            $('.right-panel').css("width", $(window).width() - x - w);
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