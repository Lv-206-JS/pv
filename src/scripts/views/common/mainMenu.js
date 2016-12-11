define([
    'backbone',
    'underscore',
    'JST',
    'models/User'
], function (Backbone, _, JST, userModel) {
    'use strict';

    var MainMenu = Backbone.View.extend({
        template: JST['common:mainMenu'],
        className: 'main-menu',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .go-to-projects': 'onGoToProjects',
            'click .sign-out-button' : 'onSignOut'
        },

        initialize: function (options) {
            this.name = options.name;
            this.page = options.page;

            userModel.fetch();
            userModel.on('sync', _.bind(this.onNameReceived, this));
            userModel.on('error', _.bind(this.onError, this));
        },

        render: function render() {
            this.$el.html(this.template({
                page: this.page,
                userName: userModel.get('firstname')
            }));
            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        onNameReceived: function () {
            this.render();
        },

        onError: function (model, resp) {
            if (resp.status === 401) {
                PV.router.navigate('/', {trigger: true});
            }
        },

        onSignOut: function onSingOut(){
            $.ajax({ url:  '/users/logout' });
            userModel.clear().set(userModel.defaults);
            PV.router.navigate('/', {trigger: true});
        }
    });

    return MainMenu;
});