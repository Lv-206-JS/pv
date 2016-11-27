define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var ProjectsHeaderView = Backbone.View.extend({
        className: 'projects-header-view',
        template: JST['projects:projectsHeader'],

        initialize: function (options) {

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