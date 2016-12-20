define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
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
            },

            render: function render() {
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));

                return this;
            },

            splitterMove: function splitterMove () {
                var min = 400;
                var max = 3600;
                var minwidth = 200;

                $('#splitter').mousedown(function (e) {
                    e.preventDefault();
                    $(document).mousemove(function (e) {
                        e.preventDefault();
                        var x = e.pageX;
                        // var w = parseInt($('#splitter').css("width"));
                        if (x > min && x < max && e.pageX < ($(window).width() - minwidth)) {
                            $('.resizable').css("width", x);
                            // $('#task-container').css("width", x);
                            // $('#splitter').css("right", -w);
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