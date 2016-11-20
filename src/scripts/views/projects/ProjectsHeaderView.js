define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var ProjectsHeaderView = Backbone.View.extend({
        className: 'projects-header-view',
        template: JST['projects/ProjectsHeaderView'],

        initialize: function (options) {
            // this.renderViews();
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

    return ProjectsHeaderView;
});