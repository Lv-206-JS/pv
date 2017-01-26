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


            initialize: function (options) {
                this.model = options.model;
                /*this.model.setUrl(this.taskId);
                 this.model.fetch();
                 this.model.on('sync', _.bind(this.onChange, this));*/


                // this.projectId = options.projectId;
                // this.model = new Model();
                //this.model.setUrl(this.projectId);
                // this.tasks = this.model.get('tasks');
            },

            render: function render() {

                // var tasks = this.model.toJSON();
                this.tasks = this.model.get('tasks');
                console.log(this.tasks);
                this.$el.html(this.template({tasks: this.tasks}));

                return this;
            },

            onChange: function onChange() {
                this.render;
            }
        });

        return TaskListMobileView;
    });

