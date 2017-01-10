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

    //method creates Confirm Delete View that will handle the deletion
    var renderConfirmDeleteView = function(event, elem, callback) {
            //param event - the 'click' event passed to event handler in events:{}
            //param elem - view instance object (this)
            //param callback - your original delete method
            event.preventDefault();
            elem.confirmDeleteView = new ConfirmDeleteView({}).render();
            elem.listenTo(elem.confirmDeleteView, 'doDelete', callback);
            elem.$el.append(elem.confirmDeleteView.$el);
    };

    return renderConfirmDeleteView;
    /*
        To create a Confirm Delete View:

        1. connect this file in require.js define() function by adding path to this file, e.g.
        '../common/confirmDelete' string to its first array parameter, and by passing to its second function parameter
        returned renderConfirmDeleteView object (can use any prefered custom name)

        2. add to your view's methods a function that will handle deletion through the Confirm Delete View, some kind
        of that one: confirmDelete: function(event){confirmDeleteView(event, this, this.originalDeleteMethod);}

        3. notice that your original delete method doesn't need event.preventDefault()

        4. in events property of your view bound to 'click .your-delete-button' event your method handling deletion
        through the Confirm Delete View
    */
});
