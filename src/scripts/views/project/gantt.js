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
                this.setGanttHeight();
                // this.scrollMove();
                return this;
            },

            setGanttHeight: function () {
                var mainMenuH = parseInt($('.main-menu-container').css('height'), 10);
                var mainToolbarH = parseInt($('.menu-toolbar').css('height'), 10);
                var milestoneH = parseInt($('#milestone-view-container').css('height'), 10);
                var infoBarH = parseInt($('#info-bar-view-container').css('height'), 10);
                var ganttHeight = $(window).height() - mainMenuH - mainToolbarH - milestoneH - infoBarH;
                $('#gantt-view-container').css('height', ganttHeight);
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
                            $('.resize-left').css('width', x);
                        }
                    })
                });

                $(document).mouseup(function (e) {
                    $(document).unbind('mousemove');
                });
            },

            scrollMove: function() {
                //TODO make it work faster
                $('#gantt-chart-container').scroll(function() {
                    var scrollPos = $('#gantt-chart-container').scrollTop();
                    $('#task-container').scrollTop(scrollPos);
                });
                $('#task-container').scroll(function() {
                    var scrollPos = $('#task-container').scrollTop();
                    $('#gantt-chart-container').scrollTop($('#task-container').scrollTop());
                });
            }


        });

        return GanttContainerView;
    });