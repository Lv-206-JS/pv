/**
 * Created by Hazard on 27.01.2017.
 */

define([
        'backbone',
        'underscore',
        'JST',
        'moment',
        'timeLine'
    ],
    function (Backbone, _, JST, Moment, TimeLine) {
        'use strict';

        var MilestoneMobileView = Backbone.View.extend({
            template: JST['project:milestoneMobile'],
            className: 'mobile-milestone-view',


            initialize: function (options) {
                this.model = options.model;
                this.timeLine = new TimeLine(this.model);
            },

            render: function render() {
                this.milestones = this.model.get('milestones');
                console.log(this.getMilestonesDates());
                this.$el.html(this.template({
                    milestones: this.milestones,
                    milestonesDates: this.getMilestonesDates()

                }));

                return this;
            },

            getMilestonesDates: function() {
                var dependsOn, milestonePTLdate, milestoneDate;
                var milestonesDates = [];
                for (var m = 0; m < this.milestones.length; m++) {
                    dependsOn = this.milestones[m].dependsOn;
                    milestonePTLdate = this.timeLine.calculateEstimateTime(dependsOn);
                    milestoneDate = this.timeLine.toDate(milestonePTLdate);
                    milestonesDates.push(Moment.unix(milestoneDate).format('DD/MM/YY HH:mm'));
                }
                return milestonesDates;
            }

        });

        return MilestoneMobileView;
    });

