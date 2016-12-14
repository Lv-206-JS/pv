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
            //this.renderTaskRows();
            return this;
        }//,

        // renderTaskRows: function () {
        //     var task = null;
        //     var lastElem = this.$el.find('.table-task-header');
        //     for (var i = 0; i < this.tasks.length; i++) {
        //         task = this.tasks[i];
        //         this.taskRowView = new TaskRowView({tasks: this.tasks, task: task}).render();
        //         $(this.taskRowView.$el).insertAfter(lastElem);
        //         lastElem = this.$el.find('.table-task-row:last');
        //     }
        // }

    });

    return GanttChartView;
});