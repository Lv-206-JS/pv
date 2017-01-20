define([
        'jquery',
        'backbone',
        'views/common/landingMobile',
        'views/common/mainView',
        'views/common/login',
        'views/common/register'
    ],
    function ($,
              Backbone,
              LandingMobileView,
              LogInView
    ) {
        'use strict';

        var MobileRouter = Backbone.Router.extend({
            routes: {
                'projects': 'openProjects',
                'project/:projectId': 'openSingleProject',
                'project/:projectId/task/:taskId': 'openProjectAndTask',
                'users/login': 'loginForm',
                'users/registration': 'registrationForm',
                '*path': 'openLandingMobilePage'
            },

            openLandingMobilePage: function openLandingMobilePage() {
                if (this.mainMobileView) {
                    this.mainMobileView.remove();
                    this.mainMobileView = null;
                }

                this.landingMobileView = new LandingMobileView();
                $('body').html(this.landingMobileView.render().$el);
            },

            openProjects: function () {
            },

            openSingleProject: function openSingleProject(projectId) {
            },

            openProjectAndTask: function openProjectAndTask(projectId) {
            },

            loginForm: function loginForm() {
            },

            registrationForm: function registrationForm() {
            }
        });

        return MobileRouter;
    }
);
