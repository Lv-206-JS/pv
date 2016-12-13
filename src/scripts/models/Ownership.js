define([
    'backbone'
], function (Backbone) {
    'use strict';

    var OwnershipModel = Backbone.Model.extend({
        url: '/rest/ownerships/',

        setUrl: function (uid, role) {
            this.url = '/rest/ownerships/' + uid + '/' + role;
        },

        defaults: {
            'projectId': '0',
            'userId': '0',
            'role': 'reader'
        }
    });
    return OwnershipModel;
});