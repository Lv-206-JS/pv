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