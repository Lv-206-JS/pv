define(['jquery', 'backbone', 'views/MainView', 'views/LandingView'], function ($, Backbone, MainView, LandingView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            'project/:projectId': 'openProject',
            'project/:projectId/task/:taskId': 'openProjectAndTask',
            '*path': 'openLandingPage'
        },

        openLandingPage: function openLandingPage() {
            if (this.mainView) {
                this.mainView.remove();
                this.mainView = null;
            }

            if (!this.landingView) {
                this.landingView = new LandingView();
                $('body').append(this.landingView.render().$el);
            }
        },

        openProject: function openProject(projectId) {
            if (this.landingView) {
                this.landingView.remove();
                this.landingView = null;
            }

            if (!this.mainView) {
                this.mainView = new MainView({projectId: projectId});
                $('body').append(this.mainView.render().$el);
            }
        },

        openProjectAndTask: function openProjectAndTask(projectId, taskId) {
            this.openProject(projectId);
        }
    });
    return Router;
});