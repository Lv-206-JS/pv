define([
    'jquery',
    'backbone',
    'views/landing',
    'views/common/mainView',
    'views/common/signIn'
],
function (
    $,
    Backbone,
    LandingView,
    MainView,
    SignInView
) {
    'use strict';

    var Router = Backbone.Router.extend({
        view: null,
        routes: {
            'projects': 'openProjects',
            'project/:projectId': 'openSingleProject',
            'project/:projectId/task/:taskId': 'openProjectAndTask',
            'user/signin' : 'openSingIn',
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
        },

        openSingIn: function openSignIn() {
            if (this.landingView) {
                this.landingView.remove();
                this.landingView = null;
            }

            if (!this.signInView) {
                // Create new view.
                this.signInView = new SignInView();
            }

            $('body').html(this.signInView.render().$el);
        }
    });
    return Router;
});