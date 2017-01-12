define(['backbone',
        'underscore',
        'JST',
        'views/project/editResource',
        'views/project/settings'],
    function (Backbone, _, JST, EditResource, SettingsView) {
        'use strict';

        var ResourcesView = Backbone.View.extend({
            template: JST['project:resources'],
            className: 'resources-view show-content',

            initialize: function (options) {
                this.resources = options.resources;
                this.resource = {};
            },

            render: function render() {
                this.$el.html(this.template({
                    resources: this.resources
                }));
                return this;
            },
            events: {
                'click #create-resource' : 'showResourceEdit',
                'click .edit-resource' : 'showResourceEdit',
                'click .edit' : 'showResourceEdit',
                'click .remove-resource': 'deleteResource',
                'click .cancel-button' : 'hideTaskView',
                'click .ok-button' : 'submitChanges'
            },

            showResourceEdit: function(event){
                this.resource = {};
                var element = $(event.currentTarget);
                var resourceNumber = element.attr('id');
                if( resourceNumber === 'create-resource'){
                    this.resource.resourceName = '';
                    this.resource.rate = '';
                    this.resource.type = '';
                }
                else
                    this.resource = this.resources[resourceNumber];

                this.editResource = new EditResource({
                    resources: this.resources,
                    resource: this.resource
                });
                this.editResource.render();
                this.$el.append(this.editResource.$el);
                this.listenTo(this.editResource,'showResourceChanges',this.render);
            },

            deleteResource: function(event){
                var element = $(event.currentTarget);
                var resourceNumber = element.attr('id');
                this.resources.splice(resourceNumber,1);
                $(element).parent().parent().remove();
            },

            submitChanges: function(event){
                this.trigger('saveResources',this.resources);
                event.preventDefault();
                this.$el.remove();
            },

            hideTaskView: function(event){
                event.preventDefault();
                this.$el.remove();
            }
        });

        return ResourcesView;
    });

