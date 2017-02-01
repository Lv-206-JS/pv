/**
 * Created by Hazard on 20.01.2017.
 */

define([
    'backbone',
    'JST',
    'backbone-validation'
], function (Backbone, JST) {
    'use strict';

    var LoginMobileView = Backbone.View.extend({
        template: JST['common:loginMobile'],
        className: 'login-mobile-view',
        events: {
            'click .ok-button': 'onSubmit',
            'click #exit-button': 'hideLoginView',
            'keydown .mobile-form-control': 'removeErrors'
        },

        initialize: function initialize() {
            this.model = PV.userModel;
            this.model.setUrl('/rest/user');
            this.model.fetch();
            Backbone.Validation.bind(this);
        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        onSubmit: function onSubmit(e) {
            e.preventDefault();
            var email = this.$el.find('[name="email"]')[0].value;
            var password = this.$el.find('[name="password"]')[0].value;

            this.model.set({
                email: email,
                password: password
            });

            this.model.setUrl('/users/login/');

            console.log(this.model.isValid(['email', 'password']));

            if (this.model.isValid(['email', 'password'])) {

                //We are making validation before saving, that's why we set it to false inside save()
                this.model.save({},{validate: false}).then(
                    function() {
                        setTimeout (function () {
                            PV.router.navigate('projects', {trigger: true});
                        }, 500);

                    },
                    function(error) {
                        // Error handling from Backend
                        console.log(error);
                    }
                );
            } else {
                this.handleErrors();
            }

        },

        handleErrors: function () {
            var that = this,
                errors = this.model.validate(),
                inputs = this.$el.find('.mobile-form-control');

            _.each(inputs, function(input) {
                var inputName = $(input).attr('name');

                if (errors[inputName]) {
                    that.$el.find('.' + inputName + '-error').html(errors[inputName]);
                    $(input).addClass('error');
                }

            });
        },

        removeErrors: function (e) {
            var input = e.currentTarget;
            var inputName = $(input).attr('name');
            this.$el.find('.' + inputName + '-error').html('');
            $(input).removeClass('error');

        },

        hideLoginView: function (event) {
            event.preventDefault();
            this.$el.remove();
            PV.router.navigate('/', {trigger: true});
        }
    });

    return LoginMobileView;
});

