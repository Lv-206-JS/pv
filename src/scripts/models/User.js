define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute : 'userId',

        url: '/rest/user',

        setUrl: function (url) {
            this.url = url;
        },

        defaults: {
                '_id': null,
                'userId': null,
                'firstname': '',
                'lastname': '',
                'email': ''
        },

        validation: {
            email: [{
                required: true,
                msg: 'Please, enter an email(username).'
            }, {
                pattern: 'email',
                msg: 'Valid email expected!'
            }],
            password: [{
                required: true,
                msg: 'Please, enter a password.'
            }, {
                minLength: 5,
                msg: 'Password is too short. It is expected to be longer than 5 chars!'
            }]

        }
    });

    return UserModel;
});