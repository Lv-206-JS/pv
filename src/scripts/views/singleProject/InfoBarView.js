define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var InfoBarView = Backbone.View.extend({
        template: JST['singleProject:InfoBarView'],
        className: 'info-bar-view',

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return InfoBarView;
});