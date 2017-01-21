define([
    'backbone',
    'JST',
    'views/common/landingMenu'
], function (Backbone, JST, LandingMenuView) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['common:landing'],
        className: 'landing-view',
        events: {
            'click .landing-started-button': 'onGoToRegistration'
        },

        initialize: function (options) {
            this.landingMenuView;
            this.trigger = false;
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
            this.listenTo(this.landingMenuView,'renderLanding',this.renderLanding);
            var userId = this.landingMenuView.userModel.get('userId');
            if(userId!==null){
                this.$el.find('.landing-started-button').addClass('hide-button');
            }
            else{
                if(this.$el.find('.landing-started-button').hasClass('hide-button')){
                    this.$el.find('.landing-started-button').removeClass('hide-button');
                }
            }
            return this;
        },

        renderLanding: function(){
            this.render();
        },

        onGoToRegistration: function(){
            this.landingMenuView.onRegistration();
        },

        getLandingBlockHeight: function () {
            var height = $(window).height();
            $('.landing-block-height').css('height', height);
        }

    });

    return LandingView;
});
