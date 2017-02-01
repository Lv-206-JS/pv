define(['backbone', 'JST', '../modalView'],
    function (Backbone, JST, ModalView) {
        'use strict';

        var ConfirmDeleteView = ModalView.extend({
            template: JST['common:confirmDelete'],
            className: 'confirm-delete-view show-content',
            targetButton: '',
            initialize: function () {
                this.showModalView();
            },

            events: {
                'click .ok-button': 'doDelete',
                'click .cancel-button': 'hideModalView'
            },

            render: function render() {
                this.$el.html(this.template({}));
                return this;
            },

            doDelete: function doDelete(event) {
                this.trigger('doDelete', event);
                this.hideModalView();
            },

            showConfirmDeleteView: function showConfirmDeleteView(event) {
                this.targetButton = event.currentTarget;
                this.confirmDeleteView = new ConfirmDeleteView().render();
                this.$el.append(this.confirmDeleteView.$el);
                this.listenTo(this.confirmDeleteView, 'doDelete', this.doDeleteClicked);
            }

        });

        return ConfirmDeleteView;
    });
