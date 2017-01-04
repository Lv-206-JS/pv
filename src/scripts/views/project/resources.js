define(['backbone',
        'underscore',
        'JST'],
    function (Backbone, _, JST) {
        'use strict';

        var ResourcesView = Backbone.View.extend({
            template: JST['project:resources'],
            className: 'resources-view show-content',

            initialize: function (options) {
                this.resources = options.resources;
                this.model = options.model;
                this.resource = {resourceId:""};
            },

            render: function render() {
                this.$el.html(this.template({
                    resources: this.resources
                }));
                return this;
            },
            events: {
                'click .tab-general' : 'showResourcesList',
                'click #create-resource' : 'showResourceEdit',
                'click .edit-resource' : 'showResourceEdit',
                'click .edit' : 'showResourceEdit',
                'click .remove-resource': 'deleteResource',
                'click .save-resource' : 'saveResource',
                'click .cancel-button' : 'hideTaskView',
                'click .ok-button' : 'submitChanges'
            },

            showResourceEdit: function(event){
                this.$el.find('.tab-general').removeClass('w--current');
                this.$el.find('.tab-edit-resource').removeClass('hide-content');
                this.$el.find('.tab-edit-resource').addClass('w--current');
                this.$el.find('.tab-general-content').removeClass('show-content');
                this.$el.find('.tab-general-content').addClass('hide-content');
                this.$el.find('.tab-edit-resource-content').removeClass('hide-content');
                this.$el.find('.tab-edit-resource-content').addClass('show-content');
                var element = $(event.currentTarget);
                var resourceId = element.attr('id');
                if( resourceId!=='create-resource'){
                    var arrayNumber;
                    for(var i = 0; i < this.resources.length; i++)
                        if(this.resources[i].resourceId == resourceId) {
                            arrayNumber = i;
                            this.resource = this.resources[i];
                            break;
                        }
                    this.$el.find('.resource-name').val(this.resources[arrayNumber].resourceName);
                    this.$el.find('.resource-type').val(this.resources[arrayNumber].type);
                    this.$el.find('.resource-rate').val(this.resources[arrayNumber].rate);
                }
            },

            showResourcesList: function(){
                this.$el.find('.tab-general').addClass('w--current');
                this.$el.find('.tab-general-content').removeClass('hide-content');
                this.$el.find('.tab-general-content').addClass('show-content');
                this.$el.find('.tab-edit-resource').removeClass('w--current');
                this.$el.find('.tab-edit-resource').addClass('hide-content');
                this.$el.find('.tab-edit-resource-content').removeClass('show-content');
                this.$el.find('.tab-edit-resource-content').addClass('hide-content');
                this.$el.find('.resource-name').val("");
                this.$el.find('.resource-rate').val("");
            },

            updateResourcesList: function(resourceElementNumber,resource){
                var element = $('.'+resource.resourceId);
                element.html(resource.resourceName);
                var parent = $(element).parent().parent();
                var elem = $(parent).children('div')[1];
                $(elem).html(resource.rate);
            },

            addResourceItem: function(resource){
                var parent = document.getElementsByClassName("resources-list");
                $( parent ).append("<div class='table-resource-row'><div class='table-cell-resource'>" +
                    "<div class='"+resource.resourceId+"'>"+resource.resourceName+"</div>"+
                    "<span class='resource-link remove-resource' id='"+resource.resourceId+"'></span>"+
                    "<span class='resource-link edit-resource' id='"+ resource.resourceId +"'></span></div>"+
                    "<div id='"+resource.resourceId+"' class='table-cell-resource'>"+resource.rate+"</div></div>"
                );
            },

            deleteResource: function(event){
                var element = $(event.currentTarget);
                var resourceId = element.attr('id');
                for(var i = 0; i < this.resources.length; i++){
                    if(this.resources[i].resourceId == resourceId){
                        this.resources.splice(i,1);
                        break;
                    }
                }
                $(element).parent().parent().remove();
            },

            saveResource: function(){
                event.preventDefault();
                this.resource.resourceName = this.$el.find('.resource-name').val();
                this.resource.type = this.$el.find('.resource-type').val();
                this.resource.rate = this.$el.find('.resource-rate').val();

                if( this.resource.resourceId)
                    for(var i = 0; i < this.resources.length; i++){
                        if(this.resource.resourceId == this.resources[i].resourceId) {
                            this.resources[i] = this.resource;
                            this.updateResourcesList(i,this.resource);
                        }
                    }
                else{
                    this.resource.resourceId = this.createId();
                    this.resources.push(this.resource);
                    this.addResourceItem(this.resource);
                }
                this.showResourcesList();
                this.resource = {resourceId:""};
            },

            createId: function(){
                var id = 0;
                for(var i = 0; i < this.resources.length; i++){
                    if(id < this.resources[i].resourceId)
                        id = this.resources[i].resourceId;
                }
                return ++id;
            },

            submitChanges: function(event){
                this.model.set('resources',this.resources);
                this.model.save();
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

