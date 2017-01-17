define([
    'backbone',
    'JST',
    'backbone-validation'
], function (Backbone, JST) {
    'use strict';

    var LogInView = Backbone.View.extend({
        template: JST['common:logIn'],
        className: 'log-in-view',
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

            console.log(this.model.isValid(['email', 'password']));



            this.model.setUrl('/users/login/');
            console.log(this.model);
            this.model.save().then(
                function (res) {
                    setTimeout(function () {
                        PV.router.navigate('projects', {trigger: true});
                    }, 1000);

                },
                function (err) {
                    // Error handling
                    console.log(err);
                }
            );
        },

        hideLogInView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return LogInView;
});
