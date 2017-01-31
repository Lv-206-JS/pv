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
                this.resources = this.model.get('resources');
            },

            render: function render() {
                this.$el.html(this.template({resources: this.resources}));

                return this;
            }

        });

        return ResourceMobileView;
    });


