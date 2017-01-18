define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute: 'userId',

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

            firstname: {
                rangeLength: [0, 45],
                msg: 'Its too short or too long!'
            },
            lastname: {
                rangeLength: [0, 45],
                msg: 'Its too short or too long!'
            },
            email: [{
                required: true,
                msg: 'Please, enter an email (username).'
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
            }],
            password2: {
                equalTo: 'password'
            }

        }
    });

    return UserModel;
});
