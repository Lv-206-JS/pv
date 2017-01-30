/**
 * Created by Hazard on 27.01.2017.
 */

define([
        'backbone',
        'underscore',
        'JST',
        'timeLine'
    ],
    function (Backbone, _, JST, TimeLine) {
        'use strict';

        var MilestoneMobileView = Backbone.View.extend({
            template: JST['project:milestoneMobile'],
            className: 'mobile-milestone-view',


            initialize: function (options) {
                this.model = options.model;

                this.timeLine = new TimeLine(this.model);
                this.projectEstimateTime = this.timeLine.calculateEstimateTime();
            },

            render: function render() {
                // this.tasks = this.model.get('tasks');
                // this.$el.html(this.template({tasks: this.tasks}));
                this.milestones = this.model.get('milestones');
                this.$el.html(this.template({
                    milestones: this.milestones
                }));

                return this;
            }

        });

        return MilestoneMobileView;
    });

