define([
    'backbone',
    'underscore',
    'mousetrap',
    './common/confirmDelete'
], function (Backbone, _, Mousetrap, ConfirmDeleteView) {
    'use strict';

    var modalViewStack = [];

    var ModalView = Backbone.View.extend({


        initialize: function () {
            console.log('test');
            //this.bindMousetrap();
            Mousetrap.bind('5', function (e) {
                console.log("test mousetrap in modal view");
            });
        },

        showModalView: function showModalView() {
            modalViewStack.push(this);
        },

        hideModalView: function hideModalView(event) {
            event.preventDefault();
            modalViewStack.pop();
            this.$el.remove();

        },

        showConfirmDeleteView: function showConfirmDeleteView(event) {
            event.preventDefault();
            this.confirmDeleteView = new ConfirmDeleteView({}).render();
            this.$el.append(this.confirmDeleteView.$el);
            this.listenTo(this.confirmDeleteView, 'doDelete', this.doDeleteClicked);
            modalViewStack.push(this.confirmDeleteView);
        },

        doDeleteClicked: function doDeleteClicked() {
            this.confirmDelete();
            modalViewStack.pop();
            modalViewStack.pop();
        },

        confirmDelete: function confirmDelete() {

        },

        bindMousetrap: function bindMousetrap() {
            //var elem = this.$el;
            Mousetrap.reset();
            var mousetrap = new Mousetrap(this.$el);
            mousetrap.bind('esc', this.hideModalView);
        }

        /*
        onEnter: function onEnter() {

        }
        */

    });

    return ModalView;
});