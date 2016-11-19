define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var MilestoneView = Backbone.View.extend({
        template: JST.MilestoneView,
        className: 'milestone-view',

        initialize: function () {
        },

        render: function render() {
            var me = this;
            me.$el.html(me.template({}));
            return me;
        }
    });

    return MilestoneView;
});