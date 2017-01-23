define(['backbone', 'underscore', 'JST', 'timeLine', 'moment'], function (Backbone, _, JST, TimeLine, Moment) {
    'use strict';

    var TaskInfoView = Backbone.View.extend({
        template: JST['project:taskInfo'],
        className: 'task-info-view',

        initialize: function (options) {
            this.model = options.model;
            this.timeLine = new TimeLine(this.model);
            this.tasks = this.model.get('tasks');
            this.task = options.task;
            this.startDate = this.timeLine.toDate(this.task.startDate);
            this.startDate = Moment.unix(this.startDate, 's').format('DD/MM/YY');
            this.endDate = this.timeLine.toDate(this.task.startDate + this.task.estimateTime);
            this.endDate = Moment.unix(this.endDate, 's').format('DD/MM/YY');
            this.name = this.task.name;
            this.description = this.task.description;
            this.estimateTime = Moment.duration(this.task.estimateTime, 'seconds').asHours();
            this.resource = this.task.resource;
            var dependencies = [];
            for (var j = 0; j < this.task.dependsOn.length; j++) {
                dependencies.push(this.task.dependsOn[j].taskId);
            }
            for (j = 0; j < dependencies.length; j++) {
                for (var i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == dependencies[j]) {
                        dependencies[j] = this.tasks[i].name;
                    }
                }
            }
            this.dependsOn = dependencies == 0 ? " " : dependencies.toString();
        },

        render: function render() {
            this.$el.html(this.template({
                name: this.name,
                description: this.description,
                startDate: this.startDate,
                endDate: this.endDate,
                estimateTime: this.estimateTime,
                resource: this.resource,
                dependsOn: this.dependsOn
            }));
            return this;
        }
    });

    return TaskInfoView;
});