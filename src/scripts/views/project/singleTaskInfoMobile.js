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


            initialize: function (options) {
                this.model = options.model;
            },

            render: function render() {
                this.tasks = this.model.get('tasks');
                console.log(this.tasks);
                this.$el.html(this.template({tasks: this.tasks, moment: Moment}));
                return this;
            }

        });

        return TaskInfoMobileView;
    });
