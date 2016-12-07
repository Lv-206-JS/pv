define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute : 'userId',

        url: '/rest/users',
        setUrl: function () {
            this.url = '/rest/user/';
        },

        defaults: {
                '_id': '',
                'userId': '',
                'firstname': '',
                'lastname': '',
                'email': '',
                'password': ''
        }
    });

    return UserModel;
});