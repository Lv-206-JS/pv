define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var MainMenuView = Backbone.View.extend({
        template: JST.MainMenuView,
        className: 'main-menu',

        initialize: function (options) {
            this.name = options.name;
        },

        render: function render() {
            this.$el.html(this.template({name: this.name}));

            return this;
        }
    });

    return MainMenuView;
});