define([
    'backbone',
    'JST',
    'views/common/landingMenu'
], function (Backbone, JST, LandingMenuView) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['common:landing'],
        className: 'landing-view',

        initialize: function (options) {

        },

        render: function () {
            this.$el.html(this.template({}));
            this.renderViews();
            this.getLandingBlockHeight();
            return this;
        },

        renderViews: function () {
            this.landingMenuView = new LandingMenuView({
                el: this.$el.find('#landing-menu')[0]
            }).render();
            // this.$el.find('#landing-menu').html(this.landingMenuView.$el);
            return this;
        },

        getLandingBlockHeight: function () {
            var height = $(window).height();
            $('.landing-block-height').css('height', height);
        }

    });

    return LandingView;
});
