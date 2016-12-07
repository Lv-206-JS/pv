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
            this.page = options.page;
            this.model = new userModel();
            this.model.setUrl();
            this.model.fetch();
            this.model.on('sync', _.bind(this.onNameReceived, this));
            //Backbone.Events.off('onProjectNameReceived');
            //Backbone.Events.on('onProjectNameReceived', _.bind(this.updateProjectName, this));
        },

        render: function render() {
            this.$el.html(this.template({
                page: this.page,
                userName: this.model.get('firstname')
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

        onSignOut: function onSingOut(){
            userModel.clear().set(userModel.defaults());
            PV.router.navigate('/', {trigger: true});
        }
    });

    return MainMenu;
});