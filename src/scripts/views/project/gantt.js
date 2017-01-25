define([
        'backbone',
        'underscore',
        'JST',
        'views/project/tasksList',
        'views/project/ganttChart',
        'timeLine',
        'moment',
        'CriticalPath'
    ],
    function (Backbone, _, JST, TasksListView, GanttChartView, TimeLine, Moment, CriticalPath) {
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
                this.initialZoom = 100; // zoom value in %
                this.zoomK = 5;
                this.zoom = this.initialZoom;
                this.maxZoom = 300;
                this.minZoom = 20;
                this.hourLength = 4; // hour length in px
                this.rowHeight = 40;
                this.padding = 20;
                this.moment = Moment;
                this.timeLine = new TimeLine (this.model);
            },

            render: function render() {
                document.getElementById('zoom-value').innerHTML = '100%';
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.tasksListView = new TasksListView({
                    model: this.model,
                    rowHeight: this.rowHeight,
                    padding: this.padding,
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
                if(this.zoom < this.maxZoom) {
                    this.zoom += this.initialZoom/this.zoomK;
                    this.hourLength *= 1 + 2*((this.initialZoom/this.zoomK) / this.initialZoom);
                    this.findPositionsForTasks();
                    document.getElementById('zoom-value').innerHTML = this.zoom + '%';
                }
            },

            decreaseZoom: function() {
                if(this.zoom > this.minZoom) {
                    this.zoom -= this.initialZoom/this.zoomK;
                    this.hourLength *= 1 - 2*((this.initialZoom/this.zoomK) / this.initialZoom);
                    this.findPositionsForTasks();
                    document.getElementById('zoom-value').innerHTML = this.zoom + '%';
                }
            },

            fitProjectToScreen: function () {
                var projectWidth = this.ganttChartView.getProjectWidth();
                var ganttWidth =  parseInt($('#gantt-chart-container').css('width'), 10);
                if (projectWidth > ganttWidth) {
                    while (projectWidth > ganttWidth) {
                        this.decreaseZoom();
                        projectWidth = this.ganttChartView.getProjectWidth();
                    }
                } else if (projectWidth < ganttWidth) {
                    while (projectWidth < ganttWidth) {
                        this.increaseZoom();
                        projectWidth = this.ganttChartView.getProjectWidth();
                    }
                    if (projectWidth > ganttWidth) {
                        this.decreaseZoom();
                    }
                }
            },

            findPositionsForTasks: function(){
                var tasks = this.model.get('tasks');
                var timeLine = new TimeLine(this.model);
                var tasksPositions = [];
                //change width of 1 hour
                for(var i = 0; i < tasks.length; i++){
                    var singleTask = {
                        taskId: tasks[i].taskId,
                        singleTaskPositions: []
                    };

                    var task = timeLine.getWorkDays( tasks[i].startDate, tasks[i].estimateTime );
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

                    tasksPositions.push(singleTask);
                }

                this.ganttChartView = new GanttChartView({
                    model: this.model,
                    tasksPositions: tasksPositions,
                    hourLength: this.hourLength,
                    rowHeight: this.rowHeight,
                    padding: this.padding,
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
            },

            showOrHideCriticalPath: function () {
                var toolCriticalPath = $('.tool-critical-way');
                if (toolCriticalPath.hasClass('active')) {
                    toolCriticalPath.removeClass('active');
                    this.hideCriticalPath();
                } else {
                    toolCriticalPath.addClass('active');
                    this.drawCriticalPath();
                }
            },

            drawCriticalPath: function () {
                var criticalPath = new CriticalPath(this.tasks);
                var criticalPathTasks = criticalPath.startAlgorithm(),
                    criticalPathTasks = criticalPathTasks[1];
                for (var i = 0; i < this.tasks.length; i++) {
                    $('.'+this.tasks[i].taskId).css('opacity', 0.8);
                }
                for (i = 0; i < criticalPathTasks.length; i++) {
                    var criticalPathTask = $('.'+criticalPathTasks[i]);
                    criticalPathTask.addClass('critical');
                    criticalPathTask.css('fill', '#d80027');
                    criticalPathTask.css('opacity', 1);
                }
            },

            hideCriticalPath: function () {
                var criticalPath = new CriticalPath(this.tasks);
                var criticalPathTasks = criticalPath.startAlgorithm(),
                    criticalPathTasks = criticalPathTasks[1];
                for (var i = 0; i < this.tasks.length; i++) {
                    $('.'+this.tasks[i].taskId).css('opacity', 1);
                }
                for (i = 0; i < criticalPathTasks.length; i++) {
                    var criticalPathTask = $('.'+criticalPathTasks[i]);
                    criticalPathTask.removeClass('critical');
                    criticalPathTask.css('fill', '#28b463');
                }
            }

        });

        return GanttContainerView;
    });