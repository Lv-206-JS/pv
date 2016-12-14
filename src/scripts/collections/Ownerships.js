define([
    'backbone',
    '../models/Ownership'
], function (Backbone, OwnershipModel) {
    'use strict';

    var OwnershipsCollection = Backbone.Collection.extend({
        url: '/rest/ownerships',
        model: OwnershipModel
    });

    return new OwnershipsCollection();
});