define([
    'backbone',
    'underscore',
    'JST',
    'models/UserModel'
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

            Backbone.Events.off('onProjectNameReceived');
            Backbone.Events.on('onProjectNameReceived', _.bind(this.updateProjectName, this));
        },

        render: function render() {
            var user = userModel.toJSON(),
                templateData = {
                    page: this.page,
                    user: user
                };

            this.$el.html(this.template(templateData)); //displays project name

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        updateProjectName: function (name) {
            this.$el.find('.show-project-name').html(name);
        },

        onSignOut: function onSingOut(){
            userModel.clear().set(userModel.defaults());
            PV.router.navigate('/', {trigger: true});
            console.log(userModel);
        }
    });

    return MainMenu;
});