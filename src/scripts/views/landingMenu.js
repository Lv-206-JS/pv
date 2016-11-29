define([
    'backbone',
    'underscore',
    'JST'
], function (Backbone, _, JST) {
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

        onSignIn: function onSignIn() {
            //TODO Later: Add popup window for Signing In
            // We will get needed data instead of url, later from login form respond
            PV.router.navigate('user/signin', {trigger: true});
        },
        onLogIn: function onLogIn() {
            PV.router.navigate('users/login', {trigger: true});
        },
        onRegistration: function onLogIn() {
            PV.router.navigate('users/registration', {trigger: true});
        }
    });

    return LandingMenuView;
});