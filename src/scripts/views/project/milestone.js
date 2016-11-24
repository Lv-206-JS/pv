define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var MilestoneView = Backbone.View.extend({
        template: JST['project:milestone'],
        className: 'milestone-view',

        initialize: function () {
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return MilestoneView;
});