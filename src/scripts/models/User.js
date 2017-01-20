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

            firstname: [{
                required: true,
                msg: 'First name is required.'
            }, {
                rangeLength: [3, 45],
                msg: 'Name is too short or too long!'
            }],

            lastname: [{
                required: true,
                msg: 'Last name is required.'
            }, {
                rangeLength: [3, 45],
                msg: 'Name is too short or too long!'
            }],
            email: [{
                required: true,
                msg: 'Please, enter an email.'
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
            password2: [{
                required: true,
                msg: 'Confirm your password.'
            }, {
                equalTo: 'password',
                msg: 'Passwords do not match!'
            }, {
                minLength: 5,
                msg: 'Password is too short. It is expected to be longer than 5 chars!'
            }]

        }
    });

    return UserModel;
});
