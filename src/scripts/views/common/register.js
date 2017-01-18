define([
    'backbone',
    'userModel',
    'JST',
    'backbone-validation'
], function (Backbone, UserModel, JST) {
    'use strict';

    var RegistrationView = Backbone.View.extend({
        template: JST['common:register'],
        className: 'registration-view',
        events: {
            'click #post_user': 'onSubmit',
            'click #exit-button': 'hideLogInView',
            'keydown .form-control': 'removeErrors'
        },

        initialize: function() {
            this.model = new UserModel();
            Backbone.Validation.bind(this);
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },


        onSubmit: function onSubmit(e) {
            e.preventDefault();
            var that = this;
            var obj = {};

            _.each($("#regisrationForm").find('.form-control'), function(el) {

                obj[$(el).attr('name')] = $(el).val();

            });

            this.model.set(obj);
            console.log(this.model.isValid(['firstname', 'lastname', 'email', 'password', 'password2']));

            this.model.setUrl('/users/register');


            if (this.model.isValid(['firstname', 'lastname', 'email', 'password', 'password2'])) {

                this.model.save().then(
                    function(res) {
                        console.log(res);

                        var response = JSON.parse(res);
                        if (response.error == false) {
                            that.trigger('changeToLogin');

                        } else {
                            // response.error.forEach(function (mess) {
                            //     var err_mess = that.$el.find("#" + mess.param.trim());
                            //     err_mess.val('');
                            //     err_mess.attr("placeholder", mess.msg);
                            //     err_mess.addClass("error");
                            // });
                        }

                    },
                    function(error) {
                        // Error handling from Backend
                        console.log(error);
                    }
                );
            } else {
                console.log(this.model.validate());
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


    return RegistrationView;
});
