define([
    'backbone',
    'JST',
    '../common/mainMenu',
    './projectsHead',
    'views/projects/projectsArea'
], function (Backbone, JST, MainMenuView, ProjectsHeaderView, ProjectsAreaView ) {
    'use strict';

    var MainProjectsView = Backbone.View.extend({
        className: 'main-projects-view',
        events: {
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function () {
        },

        render: function render() {
            this.renderViews();
            return this;
        },
        // TODO name All function for better bugTracking
        renderViews: function renderViews() {
            // this.mainMenuView = new MainMenuView({page: 'projects'}).render();
            // // TODO Change Append to concrete div or element
            // this.$el.append(this.mainMenuView.$el);

            this.projectsHeaderView = new ProjectsHeaderView().render();
            this.$el.append(this.projectsHeaderView.$el);

            this.projectsAreaView = new ProjectsAreaView().render();
            this.$el.append(this.projectsAreaView.$el);

            return this;
        },

        onChange: function onChange() {
            // TODO delete this cleaning and add new rendering of elements to renderViews
            this.$el.html('');
            this.renderViews();
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return MainProjectsView;
});