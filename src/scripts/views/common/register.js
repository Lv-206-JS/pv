define([
    'backbone',
    'userModel',
    'JST'
], function (Backbone, UserModel, JST) {
    'use strict';

    var RegistrationView = Backbone.View.extend({
        template: JST['common:register'],
        className: 'registration-view',
        events: {
            'click #post_user': 'onSubmit',
            'click #exit-button': 'hideLogInView',
            'click .form-input-text': 'hideError'
        },

        initialize: function() {
            this.model = new UserModel();
            Backbone.Validation.bind(this);
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },


        onSubmit: function onSubmit(event) {
            var that = this;
            var obj = {};
            event.preventDefault();
            console.log($("#regisrationForm").serialize());
            _.each($("#regisrationForm").find('.form-control'), function(el) {
                console.log($(el).attr('name'),$(el).val());
                obj[$(el).attr('name')] = $(el).val();
                // that.model.set({$(el)
            });

            this.model.set(obj);
            console.log(this.model.isValid(['email', 'password']));

            if (this.model.isValid(['email', 'password'])) {
                this.model.setUrl('/users/register');
                this.model.save().then(
                    function(res) {
                        console.log(res);
                        // that.trigger('editedProject', that.model);
                        var response = JSON.parse(res);
                        if (response.error == false) {
                            that.trigger('changeToLogin');
                            //Backbone.history.navigate('users/login', { trigger: true });

                        } else {
                            response.error.forEach(function (mess) {
                                var err_mess = that.$el.find("#" + mess.param.trim());
                                err_mess.val('');
                                err_mess.attr("placeholder", mess.msg);
                                err_mess.addClass("error");
                            });
                        }

                    },
                    function(error) {
                        // Error handling
                        console.log(error);
                    }
                );
            } else {
                console.log('HANDLE ERRORS FUNCTION');
                console.log(this.model.validate());
                // this.handleErrors();
            }
            // var elem = this.$el;
            // var response = $.ajax({
            //     url: '/users/register',
            //     type: 'POST',
            //     data: $("#regisrationForm").serialize(),
            //     dataType: 'json',
            //     async: false,
            //     success: function (res) {
            //         var response = JSON.parse(res);
            //         if (response.error == false) {
            //             that.trigger('changeToLogin');
            //             //Backbone.history.navigate('users/login', { trigger: true });
            //
            //         } else {
            //             response.error.forEach(function (mess) {
            //                 var err_mess = elem.find("#" + mess.param.trim());
            //                 err_mess.val('');
            //                 err_mess.attr("placeholder", mess.msg);
            //                 err_mess.addClass("error");
            //             });
            //         }
            //
            //     },
            //     error: function (err) {
            //
            //         console.log(err);
            //     }
            // });
        },

        hideError: function (event) {
            event.preventDefault();
            if ($(event.currentTarget).hasClass("error"))
                $(event.currentTarget).removeClass("error");
        },

        hideLogInView: function (event) {
            event.preventDefault();
            this.$el.remove();
        }

    })


    return RegistrationView;
});
