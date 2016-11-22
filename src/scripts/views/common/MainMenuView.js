define([
    'backbone',
    'underscore',
    'JST',
    'models/UserModel'
], function (Backbone, _, JST, userModel) {
    'use strict';

    var MainMenuView = Backbone.View.extend({
        template: JST.MainMenuView,
        className: 'main-menu',
        events: {
            'click .go-to-projects': 'onGoToProjects'
        },

        initialize: function (options) {
            this.name = options.name;
            this.page = options.page;
        },

        render: function render() {
            var user = userModel.toJSON();
            this.$el.html(this.template({name: this.name, page: this.page, user: user})); //displays project name

            return this;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return MainMenuView;
});