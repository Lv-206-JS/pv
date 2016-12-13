define(['backbone',
    'underscore',
    'JST',
    '../../../bower_components/draggabilly/dist/draggabilly.pkgd.js',
    'moment'
], function (Backbone, _, JST, Draggabilly, Moment) {
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
            this.moment = Moment;
        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.model.get('milestones'),
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList,
                milestoneEdit: this.milestoneEdit,
                moment: this.moment
            }));
            return this;
        },

        events: {
            'click .ok-button, .cancel-button' : 'hideMilestoneEditView',
            'click .edit-milestone' : 'getEditView',
            'click #create-milestone': 'getEditView',
            'click .tab-general': 'getMilestoneListView',
            'click .save-milestones-button' : 'saveMilestoneSettings',
            'click .remove-milestone' : 'deleteMilestone',
            'dblclick .task-item' : 'addTaskToList'
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
            this.$el.find('.tab-dependencies').addClass('w--current');
            this.$el.find('.tab-general').removeClass('w--current');
            this.$el.find('.general-content').removeClass('show-content');
            this.$el.find('.general-content').addClass('hide-content');
            this.$el.find('.dependencies-content').removeClass('hide-content');
            this.$el.find('.dependencies-content').addClass('show-content');
            this.$el.find('.tab-dependencies').removeClass('hide-content');
            this.$el.find('.tab-dependencies').addClass('show-content');
            this.makeTasksDraggable(this.tasksList, this.dependenciesList);
        },

        getMilestoneListView: function () {
            this.$el.find('.tab-general').addClass('w--current');
            this.$el.find('.tab-dependencies').removeClass('w--current');
            this.$el.find('.tab-dependencies').removeClass('show-content');
            this.$el.find('.tab-dependencies').addClass('hide-content');
            this.$el.find('.dependencies-content').removeClass('show-content');
            this.$el.find('.dependencies-content').addClass('hide-content');
            this.$el.find('.general-content').removeClass('hide-content');
            this.$el.find('.general-content').addClass('show-content');
        },

        saveMilestoneSettings: function (event) {
            event.preventDefault();
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
        },

        deleteMilestone: function (event) {
            event.preventDefault();
            var updatedMilestones = this.model.get('milestones');
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
        },

        makeTasksDraggable: function(tasksList, dependenciesList){
            var draggableElements = document.getElementsByClassName('task-item');
            var draggies = [];
            for (var i = 0; i < draggableElements.length; i++){
                var draggableElem = draggableElements[i];
                draggies[i] = new Draggabilly(draggableElem,{
                    containment: '.tab-container'
                });
                draggies[i].on('dragEnd',onDragEnd);
            }

            function onDragEnd() {
                if (this.position.x > 225) {
                    $("#dependencies-list tbody").append(this.element);
                    $(this.element).css({'left': '260', 'top': '0'});
                }
                if (this.position.x < 224) {
                    $("#tasks-list tbody").append(this.element);
                    $(this.element).css({'left': '0', 'top': '0'});
                }
                $(this.element).css({'left': '260', 'top': '0'});
                var trigger = false;
                for (var i = 0; i < tasksList.length; i++)
                    if (tasksList[i].taskId === $(this.element).attr('id')) {
                        dependenciesList[dependenciesList.length] = tasksList[i];
                        tasksList.splice(i, 1);
                        trigger = true;
                        break;
                    }
                if (!trigger)
                    for (var i = 0; i < dependenciesList.length; i++)
                        if (dependenciesList[i].taskId === $(this.element).attr('id')) {
                            tasksList[tasksList.length] = dependenciesList[i];
                            dependenciesList.splice(i, 1);
                        }
            }
        },

        addTaskToList: function(event){
            var element = $(event.currentTarget);
            var taskId = element.attr('id');
            var listName = element.parent().parent().attr('id');
            if(listName === 'tasks-list'){
                for( var i = 0; i < this.tasksList.length; i++)
                    if(this.tasksList[i].taskId === taskId){
                        this.dependenciesList.push(this.tasksList[i]);
                        this.tasksList.splice(i,1);
                        break;
                    }
                $("#dependencies-list tbody").append(element);
            }
            else{
                for( var i = 0; i < this.dependenciesList.length; i++)
                    if(this.dependenciesList[i].taskId === taskId){
                        this.tasksList.push(this.dependenciesList[i]);
                        this.dependenciesList.splice(i,1);
                        break;
                    }
                $("#tasks-list tbody").append(element);
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