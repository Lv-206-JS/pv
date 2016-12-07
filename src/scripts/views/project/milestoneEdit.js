define(['backbone',
    'underscore',
    'JST',
    '../../../bower_components/draggabilly/dist/draggabilly.pkgd.js'
], function (Backbone, _, JST, Draggabilly) {
    'use strict';

    var MilestoneEditView = Backbone.View.extend({
        template: JST['project:milestoneEdit'],
        className: 'milestone-edit-view show-content',

        initialize: function (options) {
            this.model = options.model;
            this.milestones = options.milestones;
            this.tasks = this.model.get('tasks');
            this.milestoneEdit = {
                name: "",
                date: "",
                dependsOn: []
            };
            this.tasksList = [];
            this.dependenciesList = [];
        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.milestones,
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList,
                milestoneEdit: this.milestoneEdit
            }));
            return this;
        },

        events: {
            'click .ok-button' : 'hideMilestoneEditView',
            'click .milestone-item' : 'getEditView',
            'click #create-milestone': 'getEditView',
            'click .tab-milestone-list': 'getMilestoneListView',
            'click .save-milestones-button' : 'saveMilestoneSettings',
            'click #delete-milestone' : 'deleteMilestone'
        },

        getTasksList: function(el){
            var isNotDependency = [];
            var isDependency = [];
            var len = 0;
            if(this.milestoneEdit.dependsOn) {
                len = this.milestoneEdit.dependsOn.length;
            }
            for( var i = 0; i < this.tasks.length; i++) {
                var isCurrentDependensy = false;
                for( var j = 0; j < len; j++) {
                    if( this.tasks[i].taskId === this.milestoneEdit.dependsOn[j].taskId) {
                        isCurrentDependensy = true;
                        isDependency.push({ taskName : this.tasks[i].name, taskId : this.tasks[i].taskId});
                    }
                }
                if(len === 0 || !isCurrentDependensy)
                    isNotDependency.push({ taskName : this.tasks[i].name, taskId : this.tasks[i].taskId});
            }
            if(el) return isNotDependency;
            else return isDependency;
        },

        getEditView: function (event) {
            var milestones = this.model.get('milestones');
            event.preventDefault();
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            var currentObj = {};
            for (var i = 0, len = milestones.length; i < len; i++) {
                if(milestoneName == milestones[i].name) {
                    currentObj = milestones[i];
                }
            }
            this.milestoneEdit = currentObj;
            this.tasksList = this.getTasksList(true);
            this.dependenciesList = this.getTasksList(false);
            this.updateMilestonesPopup();
            this.$el.find('.tab-milestone-edit').addClass('active');
            this.$el.find('.tab-milestone-list').removeClass('active');
            this.$el.find('.milestone-list-content').removeClass('show-content-milestone');
            this.$el.find('.milestone-list-content').addClass('hide-content-milestone');
            this.$el.find('.milestone-edit-content').removeClass('hide-content-milestone');
            this.$el.find('.milestone-edit-content').addClass('show-content-milestone');
            this.$el.find('.tab-milestone-edit').removeClass('hide-content-milestone');
            this.$el.find('.tab-milestone-edit').addClass('show-content-milestone');
            this.$el.find('.save-milestones-button').removeClass('hide-content-milestone');
            this.$el.find('.save-milestones-button').addClass('show-content-milestone');
            this.makeTasksDraggable(this.tasksList, this.dependenciesList);
        },

        getMilestoneListView: function () {
            this.$el.find('.tab-milestone-list').addClass('active');
            this.$el.find('.tab-milestone-edit').removeClass('active');
            this.$el.find('.tab-milestone-edit').removeClass('show-content-milestone');
            this.$el.find('.tab-milestone-edit').addClass('hide-content-milestone');
            this.$el.find('.save-milestones-button').removeClass('show-content-milestone');
            this.$el.find('.save-milestones-button').addClass('hide-content-milestone');
            this.$el.find('.milestone-edit-content').removeClass('show-content-milestone');
            this.$el.find('.milestone-edit-content').addClass('hide-content-milestone');
            this.$el.find('.milestone-list-content').removeClass('hide-content-milestone');
            this.$el.find('.milestone-list-content').addClass('show-content-milestone');
        },

        saveMilestoneSettings: function (event) {
            var updatedMilestones = this.model.get('milestones');
            var newName = this.$el.find('#milestone-settings-name').val();
            var newDate = this.$el.find('#milestone-settings-date').val();
            var newDependensies = this.dependenciesList;
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            if(milestoneName == '') {
                updatedMilestones.push({
                    name: newName,
                    date: newDate,
                    dependsOn: newDependensies
                });
            }
            else {
                var currentObj = {
                    name: newName,
                    date: newDate,
                    dependsOn: newDependensies
                };
                for (var i = 0, len = updatedMilestones.length; i < len; i++) {
                    if(milestoneName == updatedMilestones[i].name) {
                        updatedMilestones[i] = currentObj;
                        break;
                    }
                }
            }
            this.model.set({milestones:updatedMilestones});
            this.model.save({
                success:function () {
                    this.updateMilestonesPopup();
                }.call(this),

                error:function () {
                    //error handler
                }
            });
            this.model.whoChange = 'MilestoneEditView'
        },

        deleteMilestone: function (event) {
            var updatedMilestones = this.model.get('milestones');
            event.preventDefault();
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            for (var i = 0, len = updatedMilestones.length; i < len; i++) {
                if(milestoneName == updatedMilestones[i].name) {
                    updatedMilestones.splice(i, 1);
                    break;
                }
            }
            this.model.set({milestones:updatedMilestones});
            this.model.save({
                success:function () {
                    this.updateMilestonesPopup();
                }.call(this),

                error:function () {
                    //error handler
                }
            });
            this.model.whoChange = 'MilestoneEditView'
        },

        makeTasksDraggable: function(tasksList, dependenciesList){
            var draggableElements = document.getElementsByClassName('milestone-task-item');
            var draggies = [];
            for (var i = 0; i < draggableElements.length; i++){
                var draggableElem = draggableElements[i];
                draggies[i] = new Draggabilly(draggableElem);
                draggies[i].on('dragEnd',onDragEnd);
            }

            function onDragEnd() {
                var parent;
                if(this.position.x>260){
                    parent = document.getElementById("list2");
                    parent.appendChild(this.element);
                }
                if(this.position.x<180){
                    parent = document.getElementById("list");
                    parent.appendChild(this.element);
                }
                $(this.element).css({'left': '0','top':'0'});
                var trigger = false;
                for(var i = 0; i < tasksList.length; i++)
                    if(tasksList[i].taskId === $(this.element).attr('id')) {
                        dependenciesList[dependenciesList.length] = tasksList[i];
                        tasksList.splice(i,1);
                        trigger=true;
                    }
                if(!trigger)
                    for(var i = 0; i < dependenciesList.length; i++)
                        if(dependenciesList[i].taskId === $(this.element).attr('id')) {
                            tasksList[tasksList.length] = dependenciesList[i];
                            dependenciesList.splice(i,1);
                        }
            }
        },

        updateMilestonesPopup:function () {
            this.render();
        },

        hideMilestoneEditView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return MilestoneEditView;
});