define([
    'backbone',
    'underscore',
    'JST'
], function (Backbone, _, JST) {
    'use strict';

    var LandingMenuView = Backbone.View.extend({
        template: JST.LandingMenu,
        className: 'landing-main-menu',
        events: {
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function (options) {

        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return LandingMenuView;
});