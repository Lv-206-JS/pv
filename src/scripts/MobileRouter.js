define([
        'jquery',
        'backbone',
        'views/landing',
        'views/common/mainView',
        'views/common/logIn',
        'views/common/register'
    ],
    function ($,
              Backbone,
              LandingView,
              MainView,
              SignInView,
              LogInView,
              RegistrationView) {
        'use strict';

        var MobileRouter = Backbone.Router.extend({
            routes: {
                'projects': 'openProjects',
                'project/:projectId': 'openSingleProject',
                'project/:projectId/task/:taskId': 'openProjectAndTask',
                'users/login': 'loginForm',
                'users/registration': 'registrationForm',
                '*path': 'openLandingPage'
            },

            openLandingPage: function openLandingPage() {
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
