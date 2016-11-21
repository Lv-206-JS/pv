define([
    'jquery',
    'backbone',
        'views/LandingView',
        'views/projects/MainProjectsView',
        'views/singleProject/ProjectView'
],
function (
    $,
    Backbone,
    LandingView,
    MainProjectsView,
    ProjectView
) {
    'use strict';

    var Router = Backbone.Router.extend({
        view: null,
        routes: {
            'projects': 'openProjects',
            'project/:projectId': 'openSingleProject',
            'project/:projectId/task/:taskId': 'openProjectAndTask',
            '*path': 'openLandingPage'
        },

        openLandingPage: function openLandingPage() {
            if (this.view) {
                this.view.remove();
                this.view = null;
            }

            if (!this.view) {
                this.view = new LandingView();
                $('body').append(this.view.render().$el);
            }
        },

        openProjects: function () {
            // If view exists kill it!!!
            if (this.view) {
                this.view.remove();
                this.view = null;
            }

            // Create new view.
            this.view = new MainProjectsView();
            // Clean body element and append new view element.
            $('body').html(this.view.render().$el);
        },

        openSingleProject: function openSingleProject(projectId) {
            if (this.view) {
                this.view.remove();
                this.view = null;
            }

            if (!this.view) {
                this.view = new ProjectView({projectId: projectId});
                $('body').append(this.view.render().$el);
            }
        },

        openProjectAndTask: function openProjectAndTask(projectId, taskId) {
            this.openSingleProject(projectId);
        }
    });
    return Router;
});