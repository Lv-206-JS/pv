define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var OwnershipView = Backbone.View.extend({
        template: JST['project:ownership'],
        className: 'ownership-view show-content',


        initialize: function () {
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        events: {
            'click .ok-button .cancel-button' : 'hideAttachmentsView'
        },

        hideAttachmentsView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return OwnershipView;
});