
define([
    'backbone',
    'JST',
    '../common/mainMenu',
    './projectsTitle',
    './projectsArea',
    './projectsEdit'
], function (Backbone, JST, MainMenuView, ProjectsTitleView, ProjectsAreaView, ProjectsEditView ) {
    'use strict';

    var MainProjectsView = Backbone.View.extend({
        className: 'main-projects-view',
        events: {
            'click .go-to-projects': 'onGoToProjects',
            'click .create-project': 'onNewProject'
        },

        initialize: function () {
        },

        render: function render() {
            this.renderViews();
            return this;
        },

        renderViews: function renderViews() {
            // // TODO Change Append to concrete div or element
            this.projectsHeaderView = new ProjectsTitleView().render();
            this.$el.append(this.projectsHeaderView.$el);

            this.projectsAreaView = new ProjectsAreaView().render();
            this.$el.append(this.projectsAreaView.$el);

            return this;
        },

        onNewProject: function onNewProject() {
            PV.router.navigate('projects/new', {trigger: true});
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }

    });

    return MainProjectsView;
});