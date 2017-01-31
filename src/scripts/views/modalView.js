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
        },

        hideModalView: function hideModalView(event) {
            //event.preventDefault();
            var lastView = modalViewStack.pop();
            if (lastView) {
                lastView.remove();
                console.log('Last Modal View hided');
            }
            //Mousetrap.reset();
        },

        doDeleteClicked: function doDeleteClicked() {
            this.confirmDelete();
        },

        confirmDelete: function confirmDelete() {

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