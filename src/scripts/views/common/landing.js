/**
 * Created by Hazard on 22.01.2017.
 */
define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['common:landing'],
        className: 'landing-view',
        events: {
        'click .landing-started-button': 'onGoToRegistration'
        },

        initialize: function () {
            this.userModel = PV.userModel;
            this.userModel.fetch();
            this.userModel.on('sync', _.bind(this.onUserReceived, this));
        },

        render: function render() {
            this.$el.html(this.template({userId: this.userModel.get('userId')}));

            return this;
        },

        onUserReceived: function () {
            this.render();
        },

        onGoToRegistration: function(){

            this.trigger('onTryOutButton');
        }

    });

    return LandingView;
});
