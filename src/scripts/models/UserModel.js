define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        url: '/rest/user/1',
        setUrl: function (id) {
            this.url = '/rest/user/' + id;
        },

        defaults: {
            'id': '0',
            'name': '',
            'projectId': '0',
            'userId': '0',
            'role': 'author'
        }
    });

    return new UserModel();
});