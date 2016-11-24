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
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function (options) {
            this.name = options.name;
            this.page = options.page;

            Backbone.Events.off('onProjectNameReceived');
            Backbone.Events.on('onProjectNameReceived', _.bind(this.onHello, this));
        },

        render: function render() {
            var user = userModel.toJSON();
            this.$el.html(this.template({name: this.name, page: this.page, user: user})); //displays project name

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        onHello: function (name) {
            console.log(name);
        }
    });

    return MainMenu;
});