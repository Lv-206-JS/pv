define([
    'backbone',
    'underscore',
    'JST',
    'views/common/login',
    'views/common/register'
], function (Backbone, _, JST, LogInView, RegistrationView) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST['common:landingMenu'],
        events: {
            'click .go-to-projects': 'onGoToProjects',
            'click .login-btn': 'onLogIn',
            'click .registration-btn': 'onRegistration',
            'click .sign-out-button': 'onSignOut'
        },

        initialize: function () {
            this.userModel = PV.userModel;
            this.userModel.setUrl('/rest/user');
            this.userModel.fetch();
            this.userModel.on('sync', _.bind(this.onUserReceived, this));
        },

        render: function render() {
            this.$el.html(this.template({
                userId: this.userModel.get('userId'),
                userName: this.userModel.get('firstname')
            }));

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

        onRegistration: function onRegistration() {
            this.registerView = new RegistrationView({});

            this.listenTo(this.registerView, 'changeToLogin', this.onChangeToLogined);
            this.$el.find('.popup-container').html(this.registerView.render().$el);

            this.registerView.render();
            this.$el.append(this.registerView.$el);
        },

        onChangeToLogined: function () {
            this.registerView.remove();
            this.onLogIn();
        },

        onUserReceived: function () {
            this.render();
        },

        onSignOut: function onSingOut() {
            $.ajax({url: '/users/logout'});
            this.trigger('renderLanding');
            PV.userModel.clear().set(this.userModel.defaults);
            this.render();
        }

    });

    return LandingMenuView;
});
