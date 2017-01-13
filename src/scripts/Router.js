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

        var Router = Backbone.Router.extend({
            routes: {
                'projects': 'openProjects',
                'project/:projectId': 'openSingleProject',
                'project/:projectId/task/:taskId': 'openProjectAndTask',
                'users/login': 'loginForm',
                'users/registration': 'registrationForm',
                '*path': 'openLandingPage'
            },

            initialize: function (options) {
                console.log(options);
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

                }

                $('body').html(this.mainView.render().$el);

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

            openProjectAndTask: function openProjectAndTask(projectId) {
                this.openSingleProject(projectId);
            },

            loginForm: function loginForm() {

                if (!this.logInView) {
                    this.logInView = new LogInView();
                }

                $('.auth').html(this.logInView.render().$el);
            },
            registrationForm: function registrationForm() {

                if (!this.registrationView) {
                    this.registrationView = new RegistrationView();
                }

                $('.auth').html(this.registrationView.render().$el);
            }
        });
        return Router;
    }
);
