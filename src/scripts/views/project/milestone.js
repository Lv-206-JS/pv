define(['backbone', 'JST', 'moment', 'timeLine'], function (Backbone, JST, Moment, TimeLine) {
    'use strict';

    var MilestoneView = Backbone.View.extend({
        template: JST['project:milestone'],
        className: 'milestone-view',

        initialize: function (options) {
            this.model = options.model;
            this.milestones = this.model.get('milestones');
            this.timeLine = new TimeLine(this.model);
            this.projectEstimateTime = this.timeLine.calculateEstimateTime();
        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.milestones,
                milestonesPositions: this.getMilestonesPositions(),
                milestonesDates: this.getMilestonesDates(),
                startDate: this.timeLine.toDate(0),
                endDate: this.projectEndDate(),
                moment: Moment
            }));
            return this;
        },

        positionMilestone: function(milestone) {
            var milestoneEnd = this.timeLine.calculateEstimateTime(milestone);
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
            var dependsOn, milestonePTLdate, milestoneDate;
            var milestonesDates = [];
            for (var m = 0; m < this.milestones.length; m++) {
                dependsOn = this.milestones[m].dependsOn;
                milestonePTLdate = this.timeLine.calculateEstimateTime(dependsOn);
                milestoneDate = this.timeLine.toDate(milestonePTLdate);
                milestonesDates.push(milestoneDate);
            }
            return milestonesDates;
        },

        projectEndDate: function() {
            var ptlProjectEnd = this.projectEstimateTime;
            return this.timeLine.toDate(ptlProjectEnd);
        }
    });
    return MilestoneView;
});
