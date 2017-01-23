/**
 * Created by Hazard on 20.01.2017.
 */

define([
    'backbone',
    'JST',
    'views/common/loginMobile'
], function (Backbone, JST, LoginMobileView) {
    'use strict';

    var LandingMobileView = Backbone.View.extend({
        template: JST['common:landingMobile'],
        className: 'landing-mobile-view',
        events: {
            'click .login-btn': 'onLogin',
            'click .go-to-projects': 'onGoToProjects',
            'click .sign-out-button': 'onSignOut'
        },

        initialize: function () {
            this.userModel = PV.userModel;
            this.userModel.setUrl('/rest/user');
            this.userModel.fetch();
            this.userModel.on('sync', _.bind(this.onUserReceived, this));
        },

        render: function () {
            this.$el.html(this.template({
                userId: this.userModel.get('userId'),
                userName: this.userModel.get('firstname')
            }));

            return this;
        },


        onLogin: function onLogin() {

            PV.router.navigate('login', {trigger: true});

            this.loginMobileView = new LoginMobileView({});

        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        onSignOut: function onSingOut() {
            $.ajax({url: '/users/logout'});
            PV.userModel.clear().set(this.userModel.defaults);
            this.render();
        },

        onUserReceived: function () {
            this.render();
        }

    });

    return LandingMobileView;
});
