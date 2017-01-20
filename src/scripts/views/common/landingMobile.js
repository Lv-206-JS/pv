/**
 * Created by Hazard on 20.01.2017.
 */

define([
    'backbone',
    'JST',
    'views/common/loginMobile'
], function (Backbone, JST, LoginMobileView) {
    'use strict';

    var LandingMobileView = Backbone.View.extend({
        template: JST['common:landingMobile'],
        className: 'landing-mobile-view',
        events: {
            'click .login-btn': 'onLogin'
        },

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.template({}));

            return this;
        },


        onLogin: function onLogin() {

            PV.router.navigate('login', {trigger: true});

            this.loginMobileView = new LoginMobileView({});

        }

    });

    return LandingMobileView;
});
