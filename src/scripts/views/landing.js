define([
    'backbone',
    'JST',
    'views/landingMenu'
], function (Backbone, JST, LandingMenuView) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['landing'],
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



        //TODO - Change to .landing-menu-container and create all renders
        // renderViews: function () {
        //     this.landingMenuView = new LandingMenuView({}).render();
        //
        //     this.$el.find('.landing-menu').html(this.landingMenuView.$el);
        //
        //      this.landingView = new LandingView({}).render();
        //      this.$el.find('.landing-container').html(this.projectsView.$el);
        //
        //     return this;
        // }

    });

    return LandingView;
});