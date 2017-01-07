define(['backbone', 'JST'], function(Backbone, JST) {
    'use strict';

    var ConfirmDeleteView = Backbone.View.extend({
        template: JST['common:confirmDelete'],
        className: 'confirm-delete-view show-content',

        events: {
            'click .ok-button' : 'doDelete',
            'click .cancel-button' : 'hideConfirmDeleteView'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        doDelete: function doDelete(event) {
            event.preventDefault();
            this.trigger('doDelete');
            this.$el.remove();
        },

        hideConfirmDeleteView: function hideConfirmDeleteView(event) {
            event.preventDefault();
            this.$el.remove();
        }
    });

    var renderConfirmDeleteView = function(event, elem, callback) {
        /*return function (event) {
            debugger;*/
            event.preventDefault();
            elem.confirmDeleteView = new ConfirmDeleteView({}).render();
            elem.listenTo(elem.confirmDeleteView, 'doDelete', callback);
            elem.$el.append(elem.confirmDeleteView.$el);
        //};
    };

    return renderConfirmDeleteView;
});
