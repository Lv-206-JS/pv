
define([
    'backbone',
    'JST',
    '../common/mainMenu',
    './projectsTitle',
    './projectsArea',
    './projectsEdit'
], function (Backbone, JST, MainMenuView, ProjectsTitleView, ProjectsAreaView, ProjectsEditView) {
    'use strict';

    var MainProjectsView = Backbone.View.extend({
        className: 'main-projects-view',
        events: {
            'click .go-to-projects': 'onGoToProjects',
        },

        initialize: function () {
        },

        render: function render() {
            this.renderViews();
            return this;
        },

        renderViews: function renderViews() {
            this.projectsTitleView = new ProjectsTitleView().render();
            this.$el.append(this.projectsTitleView.$el);

            this.projectsAreaView = new ProjectsAreaView().render();
            this.$el.append(this.projectsAreaView.$el);

            return this;
        },

        onEditProject: function showProjectsEditPopup() {
            var project = this.model.get('project');
            this.projectsEditView = new ProjectsEditView({
                model: this.model,
                project: project
            });
            this.projectsEditView.render();
            this.$el.append(this.projectsEditView.$el);

        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }

    });

    return MainProjectsView;
});
