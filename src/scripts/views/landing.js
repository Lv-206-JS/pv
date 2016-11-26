define([
    'backbone',
    'JST',
    'views/landingMenu'
    ], function (Backbone, JST, LandingMenuView) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST.landing,
        className: 'landing-view',

        initialize: function (options) {
        },

        render: function render() {
            this.renderViews();
            this.$el.append(this.template({}));

            return this;
        },

        renderViews: function () {
            this.landingMenuView = new LandingMenuView({}).render();
            this.$el.append(this.landingMenuView.$el);

            return this;
        }

    });

    return LandingView;
});