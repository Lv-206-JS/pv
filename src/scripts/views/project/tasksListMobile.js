/**
 * Created by Hazard on 26.01.2017.
 */
define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
        'use strict';

        var TasksListMobileView = Backbone.View.extend({
            template: JST['project:tasksListMobile'],
            className: 'mobile-tasks-list',


            initialize: function (options) {
                this.model = options.model;
            },

            render: function render() {
                this.tasks = this.model.get('tasks');
                this.$el.html(this.template({tasks: this.tasks}));

                return this;
            }

        });

        return TasksListMobileView;
    });


