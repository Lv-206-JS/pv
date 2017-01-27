/**
 * Created by Hazard on 27.01.2017.
 */

define([
        'backbone',
        'underscore',
        'JST'
    ],
    function (Backbone, _, JST) {
        'use strict';

        var ResourceMobileView = Backbone.View.extend({
            template: JST['project:resourcesMobile'],
            className: 'mobile-resources-view',


            initialize: function (options) {
                this.model = options.model;
            },

            render: function render() {
                // this.tasks = this.model.get('tasks');
                // this.$el.html(this.template({tasks: this.tasks}));
                this.$el.html(this.template({project: this.model.toJSON()}));

                return this;
            }

        });

        return ResourceMobileView;
    });


