define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var MainMenuView = Backbone.View.extend({
        template: JST.MainMenuView,
        className: 'main-menu',

        render: function render() {
            var me = this;
            me.$el.html(me.template({}));
            return me;
        }
    });

    return MainMenuView;
});