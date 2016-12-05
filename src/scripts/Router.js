define([
        'jquery',
        'backbone',
        'views/landing',
        'views/common/mainView',
        'views/common/signIn',
        'models/User',
        'views/common/logIn',
        'views/common/register',
        'views/projects/projectsEdit'
    ],
    function ($,
              Backbone,
              LandingView,
              MainView,
              SignInView,
              userModel,
              LogInView,
              RegistrationView,
              ProjectsEditView
)
{
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            'projects': 'openProjects',
            'project/:projectId': 'openSingleProject',
            'projects/' : 'createProject',
            'projects/:id' : 'editProject',
            'project/:projectId/task/:taskId': 'openProjectAndTask',
            'user/signin': 'openSingIn',
            'users/login': 'loginForm',
            'users/registration': 'registrationForm',
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

           /* if (!userModel.get('userId')) {
                PV.router.navigate('/', {trigger: true});
                return;
            }*/

            if (!this.mainView) {
                // Create new view.
                this.mainView = new MainView();
                // Clean body element and append new view element.
                $('body').html(this.mainView.render().$el);
            }

            this.mainView.renderProject(projectId);
        },

        createProject: function createProject() {
            this.projectsEditView = new ProjectsEditView();
            $('body').html(this.projectsEditView.$el);

        },

        editProject: function editProject(id) {
            console.log(id);
            this.projectsEditView = new ProjectsEditView({modelId: id});
            $('body').html(this.projectsEditView.$el);

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
)
;