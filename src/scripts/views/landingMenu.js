define([
    'backbone',
    'underscore',
    'JST',
    'views/common/logIn',
    'views/common/register'
], function (Backbone, _, JST, LogInView, RegistrationView) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST.landingMenu,
        events: {
            'click .go-to-projects': 'onGoToProjects',
            'click .sign-in-button': 'onSignIn',
            'click .login-btn': 'onLogIn',
            'click .registration-btn': 'onRegistration'
        },

        initialize: function (options) {

        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        onLogIn: function onLogIn() {
            this.loginView = new LogInView({});
            this.loginView.render();
            this.$el.append(this.loginView.$el);
        },
        onRegistration: function onLogIn() {
            this.registerView = new RegistrationView({

            });

            this.registerView.render();
            this.$el.append(this.registerView.$el);
        }
    });

    return LandingMenuView;
});