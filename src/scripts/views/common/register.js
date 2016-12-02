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
            'click #post_user' : 'onSubmit'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function onSubmit(event){
            event.preventDefault();
            var elem = this.$el;
            console.log("It works!!!");
            var response = $.ajax({
                url:  '/users/register',
                type: 'POST',
                data: $("#regisrationForm").serialize(),
                async:true,
                success: function(res){
                    console.log(res);
                    Backbone.history.navigate('users/login', { trigger: true });
                },
                error: function(res){
                    console.log(res);
                    var assm = elem.find("#lastname");
                    assm.attr("placeholder", "Type your answer here");
                    var response = JSON.parse(res.responseText);
                    console.log(response.error);
                    /*response.error.forEach(mess){
                        var err_mess = elem.find("#" + mess.param.trim());
                        err_mess.attr("placeholder", mess.msg);
                    }*/
                    response.error.forEach(function(mess){
                        console.log(mess.msg);
                        var err_mess = elem.find("#" + mess.param.trim());
                        err_mess.attr("placeholder", mess.msg);
                    });
                }
            });
        }
    })


    return RegistrationView;
});