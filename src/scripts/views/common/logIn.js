define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var LogInView = Backbone.View.extend({
        template: JST['common:logIn'],
        className: 'log-in-view',
        events: {
            'submit form': 'onSubmit',
            'click #exit-button': 'hideLogInView'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        hideLogInView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return LogInView;
});