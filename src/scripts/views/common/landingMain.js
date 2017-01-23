define([
    'backbone',
    'JST',
    './landingMenu',
    './landing'
], function (Backbone, JST, LandingMenuView, LandingView) {
    'use strict';

    var LandingMainView = Backbone.View.extend({
        template: JST['common:landingMain'],
        className: 'landing-main-view',

        initialize: function () {
            this.landingMenuView = new LandingMenuView();
            this.landingView = new LandingView();
            this.listenTo(this.landingMenuView, 'onSignedOutHide', this.onSignedOutHide);
            this.listenTo(this.landingView, 'onTryOutButton', this.onTryOutButton);
        },

        render: function render() {
            this.$el.html(this.template({}));
            this.renderViews();

            return this;
        },

        renderViews: function () {

            this.$el.find('.landing-menu-container').html(this.landingMenuView.render().$el);

            this.$el.find('.landing-container').html(this.landingView.render().$el);


            return this;
        },

        onSignedOutHide : function onSignedOutHide() {
            this.landingView.render();
        },

        onTryOutButton: function onTryOutButton() {
            this.landingMenuView.onRegistration();
        }

    });

    return LandingMainView;
});
