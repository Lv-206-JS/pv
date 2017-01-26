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

                var TaskListMobileView = Backbone.View.extend({
                    template: JST['project:tasksListMobile'],
                    id: 'tasks-list',


            initialize: function (options) {
                this.model = options.model;
                this.tasks = this.model.get('tasks');
            },

            render: function render() {
                this.$el.html(this.template({
                    tasks: this.tasks
                }));

                return this;
            }


        });

        return TaskListMobileView;
    });

