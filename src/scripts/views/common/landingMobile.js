/**
 * Created by Hazard on 20.01.2017.
 */

define([
    'backbone',
    'JST',
    'views/common/login'
], function (Backbone, JST, LogInView) {
    'use strict';

    var LandingMobileView = Backbone.View.extend({
        template: JST['common:landingMobile'],
        className: 'landing-view-mobile',
        events: {
            'click .login-btn': 'onLogIn'
        },

        initialize: function () {
            this.userModel = PV.userModel;
            this.userModel.setUrl('/rest/user');
            this.userModel.fetch();

        },

        render: function () {
            this.$el.html(this.template({}));

            return this;
        },

        onLogIn: function onLogIn() {
            this.loginView = new LogInView({});
            this.loginView.render();
            this.$el.append(this.loginView.$el);
        }

    });

    return LandingMobileView;
});
