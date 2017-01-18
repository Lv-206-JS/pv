define([
    'backbone',
    'JST',
    'backbone-validation'
], function (Backbone, JST) {
    'use strict';

    var LogInView = Backbone.View.extend({
        template: JST['common:login'],
        className: 'login-view',
        events: {
            'click .ok-button': 'onSubmit',
            'click #exit-button': 'hideLogInView'
        },

        initialize: function initialize() {
            // this.userModel = PV.userModel;
            this.model = PV.userModel;
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
                this.model.save().then(
                    function() {
                        setTimeout(function () {
                            PV.router.navigate('projects', {trigger: true});
                        }, 1000);

                    },
                    function(error) {
                        // Error handling
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
                inputs = this.$el.find('.form-control');

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

        hideLogInView: function (event) {
            event.preventDefault();
            this.$el.remove();
        }
    });

    return LogInView;
});
