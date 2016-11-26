define([
    'jquery',
    'backbone',
    'views/landing',
    'views/common/mainView'
],
function (
    $,
    Backbone,
    LandingView,
    MainView
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
            if (this.mainView) {
                this.mainView.remove();
                this.mainView = null;
            }

            this.landingView = new LandingView();
            $('body').html(this.landingView.render().$el);
        },

        openProjects: function () {
            // If view exists kill it!!!
            if (this.landingView) {
                this.landingView.remove();
                this.landingView = null;
            }

            if (!this.mainView) {
                // Create new view.
                this.mainView = new MainView();
                // Clean body element and append new view element.
                $('body').html(this.mainView.render().$el);
            }

            this.mainView.renderProjects();
        },

        openSingleProject: function openSingleProject(projectId) {
            // If view exists kill it!!!
            if (this.landingView) {
                this.landingView.remove();
                this.landingView = null;
            }

            if (!this.mainView) {
                // Create new view.
                this.mainView = new MainView();
                // Clean body element and append new view element.
                $('body').html(this.mainView.render().$el);
            }

            this.mainView.renderProject(projectId);
        },

        openProjectAndTask: function openProjectAndTask(projectId, taskId) {
            this.openSingleProject(projectId);
        }
    });
    return Router;
});