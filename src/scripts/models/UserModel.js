define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        url: '/rest/user/691b9444-68a6-e4b6-b80c-731e6f18db52',
        setUrl: function (id) {
            this.url = '/rest/user/' + id;
        },

        defaults: {
            'id': '0',
            'name': 'test',
            'projectId': '0',
            'userId': '0',
            'role': 'author'
        }
    });

    return new UserModel();
});