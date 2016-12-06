define([
    'backbone',
    'JST',
    'models/User'
], function (Backbone, JST, userModel) {
    'use strict';

    var RegistrationView = Backbone.View.extend({
        template: JST['common:register'],
        className: 'register-view',
        events: {
            'click #post_user' : 'onSubmit'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function onSubmit(event){
            event.preventDefault();
            var elem = this.$el;
            var response = $.ajax({
                url:  '/users/register',
                type: 'POST',
                data: $("#regisrationForm").serialize(),
                dataType: 'json',
                async: false,
                success: function(res){

                    var response = JSON.parse(res);
                    if(response.error == false){
                        Backbone.history.navigate('users/login', { trigger: true });
                    } else {
                        response.error.forEach(function(mess){
                            var err_mess = elem.find("#" + mess.param.trim());
                            err_mess.attr("placeholder", mess.msg);
                        });
                    }

                },
                error: function(err, res){
                    res.render(err);
                }
            });
        }
    })


    return RegistrationView;
});