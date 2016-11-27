define([
    'backbone',
    'underscore',
    'JST',
    'models/UserModel'
], function (Backbone, _, JST, userModel) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST.landingMenu,
       events: {
            'click .go-to-projects': 'onGoToProjects',
            'click .sign-in-button': 'onSignIn'
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
        }
    });

    return LandingMenuView;
});