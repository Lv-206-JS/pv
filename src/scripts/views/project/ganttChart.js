define([
    'backbone',
    'JST',
    'moment',
    'timeLine',
    'views/project/ganttTaskRow'
    ], function (Backbone, JST, Moment, TimeLineLib, GanttTaskRowView) {
        'use strict';

        var GanttChartView = Backbone.View.extend({
            template: JST['project:ganttChart'],
            id: 'gantt-chart',

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.milestones = options.model.get('milestones');
                this.settings = options.model.get('settings');
                this.dayStart = Number(this.settings.dayStart);
                this.tasksPositions = (options.tasksPositions != undefined) ? options.tasksPositions : null;
            },

            render: function render() {
                this.createGanttChartDateHeader();
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.renderTaskRows();
                return this;
            },

            createGanttChartDateHeader: function () {
                var timeLine = new TimeLineLib(this.model);
                // var topDates = [],
                //     bottomDates = [],
                //     zoom = 1,
                //     hour = 50,
                //     projectStartDate,
                //     projectDuration;
                // if (zoom == 1) { // if zoom == 100%
                //
                //     // bottomDates are hours
                //     bottomDates[0]; //to Local Time
                //     for (var i = 1; i < projectDuration; i++) {
                //         bottomDates[i] = Moment(bottomDates[i-1]).add(1, 'h');
                //     }
                //     console.log(bottomDates);
                //
                //     //topDates are days
                //     topDates[0] = projectStartDate;
                //     for (i = 1; i < Moment.duration(projectDuration, 'h').asDays(); i++) {
                //         topDates[i] = Moment(topDates[i-1]).add(1, 'd');
                //     }
                // }
            },

            renderTaskRows: function () {
                var task = null;
                var lastElem = this.$el.find('.table-task-header');
                for (var i = 0; i < this.tasks.length; i++) {
                    task = this.tasks[i];
                    this.ganttTaskRowView = new GanttTaskRowView({task: task, tasksPositions: this.tasksPositions}).render();
                    $(this.ganttTaskRowView.$el).insertAfter(lastElem);
                    lastElem = this.$el.find('.table-task-row:last');
                }
            }

        });

        return GanttChartView;
    });