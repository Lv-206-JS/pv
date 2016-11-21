define([
    'backbone',
    'JST',
    'views/common/MainMenuView',
    'views/projects/ProjectsHeaderView',
    'views/projects/ProjectsAreaView'
], function (Backbone, JST, MainMenuView, ProjectsHeaderView, ProjectsAreaView ) {
    'use strict';

    var MainProjectsView = Backbone.View.extend({
        className: 'main-projects-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function () {
        },

        render: function render() {
            this.renderViews();
            return this;
        },

        renderViews: function () {
            this.mainMenuView = new MainMenuView({page: 'projects'}).render();
            this.$el.append(this.mainMenuView.$el);

            this.projectsHeaderView = new ProjectsHeaderView().render();
            this.$el.append(this.projectsHeaderView.$el);

            this.projectsAreaView = new ProjectsAreaView().render();
            this.$el.append(this.projectsAreaView.$el);

            return this;
        },

        onChange: function () {
            this.$el.html('');
            this.renderViews();
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return MainProjectsView;
});