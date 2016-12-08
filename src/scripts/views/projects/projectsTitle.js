define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var ProjectsTitleView = Backbone.View.extend({
        className: 'projects-title-view',
        template: JST['projects:projectsTitle'],

        initialize: function () {

        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        onChange: function () {
            this.$el.html('');
            this.renderViews();
        }
    });

    return ProjectsTitleView;
});