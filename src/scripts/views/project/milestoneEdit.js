define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var MilestoneEditView = Backbone.View.extend({
        template: JST['project:milestoneEdit'],
        className: 'milestone-edit-view show-content',


        initialize: function (options) {
            this.model = options.model;
            this.milestones = options.milestones;
        },

        render: function render() {
            this.$el.html(this.template({milestones: this.milestones}));
            return this;
        },

        events: {
            'click .ok-button' : 'hideMilestoneEditView'
        },

        hideMilestoneEditView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return MilestoneEditView;
});