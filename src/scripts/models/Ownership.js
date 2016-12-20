define([
    'backbone'
], function (Backbone) {
    'use strict';

    var OwnershipModel = Backbone.Model.extend({
        url: '/rest/ownerships/',

        setUrl: function (email) {
                this.url = '/rest/ownerships/' + email;
        },

        idAttribute: "_id",

        defaults: {
            'projectId': '0',
            'email': '',
            'role': 'reader'
        }
    });
    return OwnershipModel;
});