define(['backbone', 'JST', 'moment', 'timeLine'], function (Backbone, JST, Moment, TimeLine) {
    'use strict';

    var MilestoneView = Backbone.View.extend({
        template: JST['project:milestone'],
        className: 'milestone-view',

        initialize: function (options) {
            this.model = options.model;
            this.tasks = this.model.get('tasks');
            this.milestones = this.model.get('milestones');
            this.projectEstimateTime = this.calcProjectEstimateTime();
            this.settings = this.model.get('settings');
            this.projectStart = this.model.get('startDate');
            this.timeLine = new TimeLine(this.projectStart, Number(this.settings.dayStart),
                Number(this.settings.dayDuration));

        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.milestones,
                milestonesPositions: this.getMilestonesPositions(),
                milestonesDates: this.getMilestonesDates(),
                startDate: Moment.unix(this.timeLine.toDate(0)).format('DD/MM/YY h:mm'),
                endDate: this.projectEndDate()
            }));
            return this;
        },

        calculateEstimateTime: function(tasks) {
            var tasksEnd = [];
            var currentTaskEnd;
            for (var i = 0; i < tasks.length; i++) {
                currentTaskEnd = Number(tasks[i].startDate) +
                    Number(tasks[i].estimateTime);
                tasksEnd.push(currentTaskEnd);
            }
            tasksEnd.sort(function(a, b) {return b - a;});
            return tasksEnd[0];
        },

        calcProjectEstimateTime: function() {
            return this.calculateEstimateTime(this.tasks);
        },

        positionMilestone: function(milestone) {
            var milestoneEnd = this.calculateEstimateTime(milestone);
            return 100 * milestoneEnd / this.projectEstimateTime;
        },

        getMilestonesPositions: function() {
            var dependsOn;
            var milestonesPosition = [];
            for (var n = 0; n < this.milestones.length; n++) {
                dependsOn = this.milestones[n].dependsOn;
                milestonesPosition.push(this.positionMilestone(dependsOn));
            }
            return milestonesPosition;
        },

        getMilestonesDates: function() {
            var dependsOn, milestoneDate;
            var milestonesDates = [];
            for (var m = 0; m < this.milestones.length; m++) {
                dependsOn = this.milestones[m].dependsOn;
                milestoneDate = this.calculateEstimateTime(dependsOn); //in hours!!!???
                milestoneDate = Moment.duration(milestoneDate, 'hours').asSeconds();
                milestoneDate = this.timeLine.toDate(milestoneDate);
                milestoneDate = Moment.unix(milestoneDate).format('DD/MM/YY h:mm');
                milestonesDates.push(milestoneDate);
            }
            return milestonesDates;
        },

        projectEndDate: function() {
            //this.timeLine(Moment.duration(this.projectEstimateTime, 'hours').asSeconds())
            var ptlPrjEnd = Moment.duration(this.projectEstimateTime, 'hours').asSeconds();
            var realPrjEnd = this.timeLine.toDate(ptlPrjEnd);
            return Moment.unix(realPrjEnd).format('DD/MM/YY h:mm');
        }
    });
    return MilestoneView;
});
