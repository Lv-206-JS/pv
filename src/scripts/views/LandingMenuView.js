define([
    'backbone',
    'underscore',
    'JST',
    'models/UserModel'
], function (Backbone, _, JST, userModel) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST.LandingMenuView,
        className: 'landing-main-menu',
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
            userModel.setUrl(1);
            userModel.fetch();
        }
    });

    return LandingMenuView;
});