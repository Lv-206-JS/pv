define(['backbone',
        'underscore',
        'JST'],
    function (Backbone, _, JST) {
        'use strict';

        var ResourcesView = Backbone.View.extend({
            template: JST['project:editResource'],
            className: 'edit-resource-view show-content',

            initialize: function (options) {
                this.resources = options.resources;
                this.resource = options.resource;
            },

            render: function render() {
                this.$el.html(this.template({resource: this.resource}));
                return this;
            },
            events: {
                'click .cancel-button' : 'hideTaskView',
                'click .save-button' : 'submitChanges'
            },

            submitChanges: function(event){
                this.resource.resourceName = this.$el.find('.resource-name').val();
                this.resource.type = this.$el.find('.resource-type').val();
                this.resource.rate = this.$el.find('.resource-rate').val();
                if(this.resource.resourceId){
                    for(var i = 0; i < this.resources.length; i++)
                        if(this.resource.resourceId == this.resources[i].resourceId)
                            this.resources[i] = this.resource;
                    }
                else{
                    this.resource.resourceId = this.createId();
                    this.resources.push(this.resource);
                }
                this.trigger('showResourceChanges', this.resources);
                event.preventDefault();
                this.$el.remove();
            },

            createId: function(){
                var id = 0;
                for(var i = 0; i < this.resources.length; i++){
                    if(id < this.resources[i].resourceId)
                        id = this.resources[i].resourceId;
                }
                return ++id;
            },

            hideTaskView: function(event){
                event.preventDefault();
                this.$el.remove();
            }

        });

        return ResourcesView;
    });

