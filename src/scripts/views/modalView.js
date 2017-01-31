define([
    'backbone',
    'underscore',
    'mousetrap'
], function (Backbone, _, Mousetrap) {
    'use strict';

    var modalViewStack = [];

    var ModalView = Backbone.View.extend({

        /*
        initialize: function () {

        },
        */
        showModalView: function showModalView() {
            modalViewStack.push(this.$el);
            console.log('--pushed to stack---');
            console.log(modalViewStack);
            console.log('--------------------');
        },

        hideModalView: function hideModalView(event) {
            //event.preventDefault();
            var lastView = modalViewStack.pop();
            if (lastView) {
                lastView.remove();
                console.log('--removed to stack---');
                console.log(modalViewStack);
                console.log('--------------------');
            }
            //Mousetrap.reset();
        },

        doDeleteClicked: function doDeleteClicked(event) {
            this.confirmDelete(event);
        },

        confirmDelete: function confirmDelete(event) {

        },

        bindMousetrap: function bindMousetrap() {
            //Mousetrap.reset();
            var me = this;
            Mousetrap.bind('esc', function(event) {
                me.hideModalView(event);
            });
        }

    });

    return ModalView;
});