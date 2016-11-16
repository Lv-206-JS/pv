define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var InfoBarView = Backbone.View.extend({
        template: JST.InfoBarView,
        className: 'info-bar-view',

        render: function render() {
            var me = this;
            me.$el.html(me.template({}));
            return me;
        }
    });

    return InfoBarView;
});