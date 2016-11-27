define([
    'backbone',
    'JST',
    'models/User'
], function (Backbone, JST, userModel) {
    'use strict';

    var SignInView = Backbone.View.extend({
        template: JST['common:signIn'],
        className: 'sign-in-view',
        events: {
            'submit form': 'onSubmit'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function onSubmit(e) {
            e.preventDefault();
            var email = $(e.currentTarget).find('[name="email"]')[0].value;
            var password = $(e.currentTarget).find('[name="password"]')[0].value;

            userModel.set({
                email: email,
                password: password
            });

           userModel.setUrl('');
            userModel.save().then(

                function(res) {
                    setTimeout(function() {
                        PV.router.navigate('projects', {trigger: true});
                    }, 1000);

                },
                function(err) {
                    // Error handling
                    console.log(err);
                }
            );
        }
    });

    return SignInView;
});