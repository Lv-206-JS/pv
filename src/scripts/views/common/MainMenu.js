define([
    'backbone',
    'underscore',
    'JST'
], function (Backbone, _, JST) {
    'use strict';

    var MainMenuView = Backbone.View.extend({
        template: JST.MainMenu,
        className: 'main-menu',
        events: {
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function (options) {
            this.name = options.name;
            this.page = options.page;
        },

        render: function render() {
            this.$el.html(this.template({name: this.name, page: this.page})); //displays project name

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return MainMenuView;
});