define([
        'backbone',
        'underscore',
        'JST',
        'views/project/tasksList',
        'views/project/ganttChart',
        'timeLine',
        'moment'
    ],
    function (Backbone, _, JST, TasksListView, GanttChartView, TimeLineLib, Moment) {
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
                this.zoom = 100; // zoom value in %
                this.hourLength = 6; // hour length in px
                this.moment = Moment;
            },

            render: function render() {
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.tasksListView = new TasksListView({
                    model: this.model,
                    el: this.$el.find('#task-container')[0]
                }).render();
                this.findPositionsForTasks();
                this.setGanttHeight();
                this.scrollMove();
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
                var min = 200;
                var max = 3600;
                var minwidth = 200;

                $('#splitter').mousedown(function (e) {
                    e.preventDefault();
                    $(document).mousemove(function (e) {
                        e.preventDefault();
                        var x = e.pageX;
                        if (x > min && x < max && e.pageX < ($(window).width() - minwidth)) {
                            $('.resize-left').css('width', x);
                        }
                    })
                });

                $(document).mouseup(function (e) {
                    $(document).unbind('mousemove');
                });
            },

            increaseZoom: function(){
                if(this.zoom < 200) {
                    this.zoom += 20;
                    this.findPositionsForTasks(true);
                    document.getElementById('zoom-value').innerHTML = this.zoom + '%';
                }
            },

            decreaseZoom: function(){
                if(this.zoom > 20) {
                    this.zoom -= 20;
                    this.findPositionsForTasks(false);
                    document.getElementById('zoom-value').innerHTML = this.zoom + '%';
                }
            },

            findPositionsForTasks: function(trigger){
                var tasks = this.model.get('tasks');
                var timeLine = new TimeLineLib(this.model);
                var tasksPositions = [];
                //change width of 1 hour
                if( trigger === true) {
                    this.hourLength *= 2;
                } else if(trigger === false) {
                    this.hourLength /= 2;
                }
                for(var i = 0; i < tasks.length; i++){
                    var singleTask = {taskId: tasks[i].taskId, singleTaskPositions: []};
                    var task = timeLine.getWorkDays(tasks[i].startDate,tasks[i].estimateTime);
                    var projectStartDate = timeLine.toDate(0);
                    var projectStartDay = this.moment.unix(projectStartDate,'seconds').format("e");
                    for( var j = 0; j < task.length; j++){
                        var days = this.moment.duration(task[j].realDate - projectStartDate,'seconds').asDays();
                        days = days - days % 1;
                        var settings = this.model.get('settings');
                        var workingHoursPerDay = this.moment.duration(+settings.dayDuration,'seconds').asHours();
                        var notWorkingHours = days * (24 - workingHoursPerDay);
                        if((this.hourLength <= 3) || (this.hourLength >= 48)) {
                            var remainder = days % 7;
                            var notWorkingDays = (days - remainder) / 7 * 2;
                            if(((projectStartDay == 2) && (remainder >= 6 )) ||
                                ((projectStartDay == 3) && (remainder >= 5 )) ||
                                ((projectStartDay == 4) && (remainder >= 4 )) ||
                                ((projectStartDay == 5) && (remainder >= 3 )) ||
                                ((projectStartDay == 6) && (remainder >= 2 )))
                                notWorkingDays += 2;
                            notWorkingHours += notWorkingDays * workingHoursPerDay;
                        }
                        var newTaskStart = task[j].realDate - projectStartDate - notWorkingHours*3600;
                        var positionX = (newTaskStart)*(this.hourLength/3600);
                        var width = (task[j].workHours)*(this.hourLength/3600);
                        singleTask.singleTaskPositions[j] = {positionX: positionX, width: width};
                    }
                    tasksPositions[tasksPositions.length] = singleTask;
                }
                console.log(tasksPositions);
                this.ganttChartView = new GanttChartView({
                    model: this.model,
                    tasksPositions: tasksPositions,
                    hourLength: this.hourLength,
                    el: this.$el.find('#gantt-chart-container')[0]
                }).render();
            },

            scrollMove: function() {
                var flag = false;
                (function scroll() {
                    $('#gantt-chart-container').scroll(function () {
                        if (flag) {
                            flag = false;
                            return 0;
                        }
                        var scrollPos = $('#gantt-chart-container').scrollTop();
                        $('#task-container').scrollTop(scrollPos);
                        flag = true;
                    });
                    $('#task-container').scroll(function () {
                        if (flag) {
                            flag = false;
                            return 0;
                        }
                        var scrollPos = $('#task-container').scrollTop();
                        $('#gantt-chart-container').scrollTop(scrollPos);
                        flag = true;
                    });
                    return 0;
                })();
            }
        });

        return GanttContainerView;
    });