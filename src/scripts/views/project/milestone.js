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
                startDate: Moment.unix(this.timeLine.toDate(0)).format('DD/MM/YY hh:mm a'),
                endDate: this.projectEndDate()
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
            var dependsOn, milestoneDate;
            var milestonesDates = [];
            for (var m = 0; m < this.milestones.length; m++) {
                dependsOn = this.milestones[m].dependsOn;
                milestoneDate = this.timeLine.calculateEstimateTime(dependsOn); //in hours!!!???
                milestoneDate = Moment.duration(milestoneDate, 'hours').asSeconds();
                milestoneDate = this.timeLine.toDate(milestoneDate);
                milestoneDate = Moment.unix(milestoneDate).format('DD/MM/YY hh:mm a');
                milestonesDates.push(milestoneDate);
            }
            return milestonesDates;
        },

        projectEndDate: function() {
            var ptlPrjEnd = Moment.duration(this.projectEstimateTime, 'hours').asSeconds();
            var realPrjEnd = this.timeLine.toDate(ptlPrjEnd);
            return Moment.unix(realPrjEnd).format('DD/MM/YY hh:mm a');
        }
    });
    return MilestoneView;
});
