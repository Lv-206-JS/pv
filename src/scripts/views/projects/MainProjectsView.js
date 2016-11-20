define([
    'backbone',
    'JST',
    'views/common/MainMenuView',
    'views/projects/ProjectsAreaView',
    'views/projects/ProjectsHeaderView'
], function (Backbone, JST, MainMenuView, ProjectsAreaView, ProjectsHeaderView ) {
    'use strict';

    var MainProjectsView = Backbone.View.extend({
        className: 'main-projects-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage'
        },

        initialize: function () {
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function render() {
            this.renderViews();
            return this;
        },

        renderViews: function () {
            this.mainMenuView = new MainMenuView({name: 'Hello'}).render(); //change Hello to real loggedUser object
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
        }
    });

    return MainProjectsView;
});