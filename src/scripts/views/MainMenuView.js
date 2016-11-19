define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var MainMenuView = Backbone.View.extend({
        template: JST.MainMenuView,
        className: 'main-menu',

        initialize: function (options) {
            this.name = options.name;
        },

        render: function render() {
            var me = this;
            // var templateData = this.model.toJSON();

            me.$el.html(me.template({name: this.name}));

            return me;
        }
    });

    return MainMenuView;
});