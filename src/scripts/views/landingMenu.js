define([
    'backbone',
    'underscore',
    'JST',
    'models/User',
    'views/common/logIn',
    'views/common/register'
], function (Backbone, _, JST, userModel, LogInView, RegistrationView) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST.landingMenu,
        events: {
            'click .go-to-projects': 'onGoToProjects',
            'click .login-btn': 'onLogIn',
            'click .registration-btn': 'onRegistration',
            'click .sign-out-button' : 'onSignOut'
        },

        initialize: function () {
            userModel.fetch();
            userModel.on('sync', _.bind(this.onUserReceived, this));
        },

        render: function render() {
            this.$el.html(this.template({userId: userModel.get('userId'), userName: userModel.get('firstname')}));

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
        },

        onUserReceived: function () {
            this.render();
        },

        onSignOut: function onSingOut(){
            $.ajax({ url:  '/users/logout' });
            userModel.clear().set(userModel.defaults);
            this.render();
            // PV.router.navigate('/', {trigger: true});
        }
    });

    return LandingMenuView;
});