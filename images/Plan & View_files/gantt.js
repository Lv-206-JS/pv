define([
        'backbone',
        'underscore',
        'JST'//,
        //'views/project/tasksList'
    ],
    function (Backbone, _, JST) {//, TasksListView) {
        'use strict';

        var GanttContainerView = Backbone.View.extend({
            template: JST['project:ganttContainer'],
            id: 'gantt-container',

            events: {
                'mousedown #splitter': 'splitterMove'
            },

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.milestones = options.model.get('milestones');
                //this.renderViews();
            },

            render: function render() {
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));

                return this;
            },

            // renderViews: function renderViews() {
            //     this.tasksListView = new TasksListView({model: this.model}).render();
            //     this.$el.find('.left-panel').html(this.tasksListView.$el);
            // },

            splitterMove: function splitterMove () {
                var min = 200;
                var max = 3600;
                var minwidth = 200;

                $('#splitter').mousedown(function (e) {
                    e.preventDefault();
                    $(document).mousemove(function (e) {
                        e.preventDefault();
                        var x = e.pageX;
                        var w = parseInt($('#splitter').css("width"));
                        if (x > min && x < max && e.pageX < ($(window).width() - minwidth)) {
                            $('.left-panel').css("width", x);
                            $('#splitter').css("left", x);
                            //$('.right-panel').css("left", x + w);
                            $('.right-panel').css("width", $(window).width() - x - w);
                        }
                    })
                });

                $(document).mouseup(function (e) {
                    $(document).unbind('mousemove');
                });
            }

        });

        return GanttContainerView;
    });