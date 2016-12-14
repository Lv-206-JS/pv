define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute : 'userId',

        url: '/rest/user',

        defaults: {
                '_id': '',
                'userId': '',
                'firstname': '',
                'lastname': '',
                'email': ''
        }
    });

    return new UserModel();
});