define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute : 'userId',

        url: '/rest/user',

        setUrl: function () {
            this.url = '/users/login/';
        },

        defaults: {
                '_id': '',
                'userId': '',
                'firstname': '',
                'lastname': '',
                'email': ''
        },

        validation: {
            email: {
                required: true,
                pattern: 'email',
                msg: 'Please fill in username/email field.'
            },
            password: [{
                required: true,
                msg: 'Please fill in password field.',
            }, {
                minLength: 5,
                msg: 'Password is too short. It is expected to be longer than 5 chars!'

            }]

        }
    });

    return UserModel;
});