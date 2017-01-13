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
            'click .login-btn': 'onLogIn',
            'click .registration-btn': 'onRegistration',
            'click .sign-out-button' : 'onSignOut'
        },

        initialize: function () {
            PV.userModel.fetch();
            PV.userModel.on('sync', _.bind(this.onUserReceived, this));
        },

        render: function render() {
            this.$el.html(this.template({userId: PV.userModel.get('userId'), userName: PV.userModel.get('firstname')}));

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

            this.listenTo(this.registerView, 'changeToLogin', this.onChangeToLogined);
            this.$el.find('.popup-container').html(this.registerView.render().$el);

            this.registerView.render();
            this.$el.append(this.registerView.$el);
        },
        onChangeToLogined: function(){
            this.registerView.remove();
            this.onLogIn();
        },

        onUserReceived: function () {
            this.render();
        },

        onSignOut: function onSingOut(){
            $.ajax({ url:  '/users/logout' });
            PV.userModel.clear().set(PV.userModel.defaults);
            this.render();
        }
    });

    return LandingMenuView;
});