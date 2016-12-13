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
            'click #post_user' : 'onSubmit',
            'click #exit-button': 'hideLogInView',
            'click .form-input-text': 'hideError'
        },

        render: function render() {
            $(this.el).html('');
            this.$el.html(this.template({}));
            return this;
        },


        onSubmit: function onSubmit(event){
            event.preventDefault();
            var elem = this.$el;
            var that = this;
            var response = $.ajax({
                url:  '/users/register',
                type: 'POST',
                data: $("#regisrationForm").serialize(),
                dataType: 'json',
                async: false,
                success: function(res){
                    var response = JSON.parse(res);
                    if(response.error == false){
                        that.trigger('changeToLogin');
                        //Backbone.history.navigate('users/login', { trigger: true });

                    } else {
                        response.error.forEach(function(mess){
                            var err_mess = elem.find("#" + mess.param.trim());
                            err_mess.attr("placeholder", mess.msg);
                            err_mess.addClass("error");
                        });
                    }

                },
                error: function(err){

                    console.log(err);
                }
            });
        },

        hideError : function(event){
            event.preventDefault();
           if ($(event.currentTarget).hasClass("error"))
               $(event.currentTarget).removeClass("error");
        },

        hideLogInView : function(event){
            event.preventDefault();
            this.$el.remove();
        }

    })


    return RegistrationView;
});