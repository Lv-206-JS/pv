define([
    'backbone',
    'underscore',
    'JST'
], function (Backbone, _, JST) {
    'use strict';

    var ProjectsAboutView = Backbone.View.extend({
        template: JST['projects:projectsAbout'],
        className: 'projects-about',

        initialize: function (options) {
            this.model = options.model;
        },

        render: function render() {
            var projectData = this.model.toJSON();
            this.$el.html(this.template(projectData));

            return this;
        }
    });

    return ProjectsAboutView;
});