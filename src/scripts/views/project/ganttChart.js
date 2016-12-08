define(['backbone', 'JST'], function (Backbone, JST) {
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
            this.$el.html(this.template({
                model: this.model, tasks: this.tasks, milestones: this.milestones
            }));

            return this;
        }

    });

    return GanttChartView;
});