/**
 * Created by Hazard on 30.01.2017.
 */

define([
        'backbone',
        'underscore',
        'JST',
        'moment'
    ],
    function (Backbone, _, JST, Moment) {
        'use strict';

        var TaskInfoMobileView = Backbone.View.extend({
            template: JST['project:taskInfoMobile'],
            className: 'mobile-task-info-view',


            initialize: function (options) {
                this.model = options.model;
                this.task = options.task;
            },

            render: function render() {

                this.$el.html(this.template({task: this.task, moment: Moment}));
                return this;
            }

        });

        return TaskInfoMobileView;
    });
