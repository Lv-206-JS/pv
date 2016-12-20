define([
    'backbone',
    'JST',
    'views/project/ganttTaskRow'
    ], function (Backbone, JST, GanttTaskRowView) {
        'use strict';

        var GanttChartView = Backbone.View.extend({
            template: JST['project:ganttChart'],
            id: 'gantt-chart',

            initialize: function (options) {
                this.model = options.model;
                this.tasks = options.model.get('tasks');
                this.milestones = options.model.get('milestones');
            },

            render: function render() {
                this.createGanttChartDateHeader;
                this.$el.html(this.template({
                    model: this.model, tasks: this.tasks, milestones: this.milestones
                }));
                this.renderTaskRows();
                return this;
            },

            createGanttChartDateHeader: function () {
                var topDates,
                    bottomDates;
                var projectHours;
            },

            renderTaskRows: function () {
                var task = null;
                var lastElem = this.$el.find('.table-task-header');
                for (var i = 0; i < this.tasks.length; i++) {
                    task = this.tasks[i];
                    this.ganttTaskRowView = new GanttTaskRowView({tasks: this.tasks, task: task}).render();
                    $(this.ganttTaskRowView.$el).insertAfter(lastElem);
                    lastElem = this.$el.find('.table-task-row:last');
                }
            }

        });

        return GanttChartView;
    });