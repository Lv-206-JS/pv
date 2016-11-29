define([
    'backbone',
    'JST',
    'models/User'
], function (Backbone, JST, userModel) {
    'use strict';

    var RegistrationView = Backbone.View.extend({
        template: JST['common:register'],
        className: 'registration-view',
        events: {
            'submit form': 'onSubmit'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return RegistrationView;
});