define([
    'backbone',
    'JST',
    './mainMenu',
    '../projects/projects',
    '../project/project'
], function (Backbone, JST, MainMenuView, ProjectsView, ProjectView) {

    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['common:main'],
        className: 'main-view',

        initialize: function () {
        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        renderProjects: function () {
            this.mainMenuView = new MainMenuView({page: 'projects'}).render();
            this.$el.find('.main-menu-container').html(this.mainMenuView.$el);

            this.projectsView = new ProjectsView().render();
            this.$el.find('.main-container').html(this.projectsView.$el);
        },

        renderProject: function (projectId) {
            this.mainMenuView = new MainMenuView({page: 'project'}).render();
            this.$el.find('.main-menu-container').html(this.mainMenuView.$el);

            this.projectView = new ProjectView({projectId: projectId}).render();
            this.$el.find('.main-container').html(this.projectView.$el);
        }

    });

    return MainView;
});
