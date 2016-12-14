define([
    'backbone',
    '../models/Ownership'
], function (Backbone, OwnershipModel) {
    'use strict';

    var OwnershipsCollection = Backbone.Collection.extend({
        url: '/rest/ownerships',

        setUrl: function (email) {
            this.url = '/rest/ownerships/' + email;
        },

        model: OwnershipModel
    });

    return new OwnershipsCollection();
});