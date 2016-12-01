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
            /*'submit form': 'onSubmit',*/
            'click #post_user' : 'onSubmit'

        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function onSubmit(event){
            event.preventDefault();

            console.log("It works!!!");
            var response = $.ajax({
                url:  '/users/register',
                type: 'POST',
                data: $("#regisrationForm").serialize(),
                async:true,
                success: function(res){
                    console.log(res);
                    Backbone.history.navigate('users/login', { trigger: true });
                    console.log("Dzaga-dzaga");
                }
            });
        }
    })




/*    addAttachment : function (event) {
        event.preventDefault();
        var uploadfile = new FormData();

        uploadfile.append('file', $("#attachment-file").prop('files')[0]);
        var response = $.ajax({
            url:  '/rest/attachments',
            type: 'POST',
            data: uploadfile,
            contentType: false,
            processData: false,
            async:false
        });
        console.log(response.responseText);
        return this.updateModel(response.responseText);
    },*/

    return RegistrationView;
});