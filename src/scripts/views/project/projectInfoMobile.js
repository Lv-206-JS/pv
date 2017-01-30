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

        var ProjectInfoMobileView = Backbone.View.extend({
            template: JST['project:projectInfoMobile'],


            initialize: function (options) {
                this.model = options.model;
            },

            render: function render() {
                this.$el.html(this.template({project: this.model.toJSON()}));
                return this;
            }

        });

        return ProjectInfoMobileView;
    });
