define([
    'backbone',
    'underscore',
    'mousetrap'
], function (Backbone, _, Mousetrap) {
    'use strict';

    var modalViewStack = [];

    var ModalView = Backbone.View.extend({

        showModalView: function showModalView() {
            modalViewStack.push(this.$el);
            console.log('--pushed to stack---');
            console.log(modalViewStack);
            console.log('--------------------');
        },

        hideModalView: function hideModalView(event) {
            var lastView = modalViewStack.pop();
            if (lastView) {
                lastView.remove();
                console.log('--removed to stack---');
                console.log(modalViewStack);
                console.log('--------------------');
            }
        },

        doDeleteClicked: function doDeleteClicked(event) {
            this.confirmDelete(event);
        },

        confirmDelete: function confirmDelete(event) {

        },

        bindMousetrap: function bindMousetrap() {
            var me = this;
            Mousetrap.bind('esc', function(event) {
                me.hideModalView(event);
            });
        }

    });

    return ModalView;
});