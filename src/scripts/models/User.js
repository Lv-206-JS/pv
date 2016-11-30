define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        idAttribute : 'userId',

        url: '/rest/users',
        setUrl: function (id) {
            this.url = '/rest/user/' + id;
        },

        defaults: function(){
            return {
                '_id': null,
                'firstname': '',
                'lastname': '',
                'email': '',
                'password': ''
            };
        }
    });

    return new UserModel();
});