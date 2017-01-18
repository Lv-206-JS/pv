define(['backbone',
        'underscore',
        'JST',
        'views/project/editResource',
        'views/project/settings',
        '../common/confirmDelete'],
    function (Backbone, _, JST, EditResource, renderConfirmDeleteView) {
        'use strict';

        _.deepClone = function(obj) {
            if (!obj || (typeof obj !== 'object')){
                return obj;
            }
            if(_.isString(obj)){
                return obj + '';
            }
            if (_.isDate(obj)){
                return new Date(obj.valueOf());
            }
            if(_.isArray(obj)){
                var newArr = [];
                for (var i = 0; i < obj.length; i++) {
                    var obj1 = obj[i];
                    newArr[i] = _.deepClone(obj1);
                }
                return newArr;
            }
            if(_.isObject(obj)){
                var newObj = {};
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    var objKey = keys[i];
                    newObj[objKey] = _.deepClone(obj[objKey]);
                }
                return newObj;
            }
        };

        var ResourcesView = Backbone.View.extend({
            template: JST['project:resources'],
            className: 'resources-view show-content',

            initialize: function (options) {
                this.resources = options.resources;
                this.model = options.model;
                this.tasks = this.model.get('tasks');
                this.resource = {};
                this.resourcesToShow = _.deepClone(this.resources);
            },

            render: function render() {
                this.$el.html(this.template({
                    resources: this.resourcesToShow
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
                    this.resource = this.resourcesToShow[resourceNumber];

                this.editResource = new EditResource({
                    resources: this.resourcesToShow,
                    resource: this.resource
                });
                this.editResource.render();
                this.$el.append(this.editResource.$el);
                this.listenTo(this.editResource,'showResourceChanges',this.render);
            },

            deleteResource: function(event){
                var element = $(event.currentTarget);
                var resourceNumber = element.attr('id');
                this.resourcesToShow.splice(resourceNumber,1);
                $(element).parent().parent().remove();
            },

            // confirmDeleteResource: function(event){
            //     console.log('delete resource');
            //     renderConfirmDeleteView(event, this,_.bind(this.deleteResource, this, event));
            // },

            submitChanges: function(event){
                if(this.resources.length != this.resourcesToShow.length){
                    for( var i = 0; i < this.tasks.length; i++){
                        var trigger = false;
                        for( var j = 0; j < this.resourcesToShow.length; j++){
                            if(this.tasks[i].resource === this.resourcesToShow[j].resourceId)
                                trigger = true;
                        }
                        if(!trigger)
                            this.tasks[i].resource = '';

                    }
                }
                this.resources = this.resourcesToShow;
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

