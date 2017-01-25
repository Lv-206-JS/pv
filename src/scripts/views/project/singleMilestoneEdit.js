define(['backbone',
    'underscore',
    'JST',
    'Draggabilly',
    'timeLine'
], function (Backbone, _, JST, Draggabilly, TimeLine) {
    'use strict';

    var SingleMilestoneEdit = Backbone.View.extend({
        template: JST['project:singleMilestone'],
        className: 'single-milestone-edit-view',

        initialize: function (options) {
            this.model = options.model;
            this.milestones = options.milestones;
            this.milestone = options.milestone;
            this.tasksList = options.tasksList;
            this.dependenciesList = options.dependenciesList;
            this.currentName = options.currentName;
            this.makeTasksDraggable(this.tasksList, this.dependenciesList);
            this.timeLine = new TimeLine(this.model);
        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.milestones,
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList,
                milestone: this.milestone
            }));
            return this;
        },

        events: {
            'click .cancel-button': 'hideSingleMilestoneEditView',
            'click .ok-button': 'saveMilestoneSettings',
            'dblclick .milestone-task-item': 'addTaskToList'
        },

        saveMilestoneSettings: function (event) {
            event.preventDefault();
            var updatedMilestones = this.milestones;
            var newName = this.$el.find('#milestone-settings-name').val();
            var newDependensies = this.dependenciesList;
            var newDate = this.getMilestoneDate(newDependensies);
            var milestoneName = this.currentName;
            if (milestoneName == undefined) {
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
                    if (milestoneName == updatedMilestones[i].name) {
                        updatedMilestones[i] = currentObj;
                        break;
                    }
                }
            }
            this.trigger('showMilestoneChanges', this.singleMilestoneEdit);
            event.preventDefault();
            this.$el.remove();
        },

        makeTasksDraggable: function (tasksList, dependenciesList) {
            var draggableElements = document.getElementsByClassName('milestone-task-item');
            var draggies = [];
            for (var i = 0; i < draggableElements.length; i++) {
                var draggableElem = draggableElements[i];
                draggies[i] = new Draggabilly(draggableElem, {
                    containment: '.tab-container'
                });
                draggies[i].on('dragEnd', onDragEnd);
                draggies[i].on('dragStart', onDragStart);
            }

            function onDragStart() {
                var newParent = $('.milestone-clone');
                $(this.element).css({'position': 'absolute'});
                newParent.append(this.element);
                $(this.element).css({'top': this.relativeStartPosition.y-100+'px'});
                $(this.element).css({'left': this.relativeStartPosition.x-65+'px'});
                $(this.element).addClass('is-dragging');
            }

            function onDragEnd() {
                if (this.position.x >= 187) {
                    $("#dependencies-list").find("tbody").append(this.element);
                    $(this.element).css({'position': 'relative'});
                    $(this.element).css({'left': '260'});

                }
                if (this.position.x < 187) {
                    $("#milestone-tasks-list").find("tbody").append(this.element);
                    $(this.element).css({'position': 'relative'});
                    $(this.element).css({'left': '0'});
                }
                var trigger = false;
                for (var i = 0; i < tasksList.length; i++)
                    if (tasksList[i].taskId === $(this.element).attr('id')) {
                        dependenciesList[dependenciesList.length] = tasksList[i];
                        tasksList.splice(i, 1);
                        trigger = true;
                        break;
                    }
                if (!trigger)
                    for (i = 0; i < dependenciesList.length; i++)
                        if (dependenciesList[i].taskId === $(this.element).attr('id')) {
                            tasksList[tasksList.length] = dependenciesList[i];
                            dependenciesList.splice(i, 1);
                        }
            }
        },

        addTaskToList: function (event) {
            var element = $(event.currentTarget);
            var taskId = element.attr('id');
            var listName = element.parent().parent().attr('id');
            if (listName === 'milestone-tasks-list') {
                for (var i = 0; i < this.tasksList.length; i++)
                    if (this.tasksList[i].taskId === taskId) {
                        this.dependenciesList.push(this.tasksList[i]);
                        this.tasksList.splice(i, 1);
                        break;
                    }
                $("#dependencies-list tbody").append(element);
            }
            else {
                for (i = 0; i < this.dependenciesList.length; i++)
                    if (this.dependenciesList[i].taskId === taskId) {
                        this.tasksList.push(this.dependenciesList[i]);
                        this.dependenciesList.splice(i, 1);
                        break;
                    }
                $("#milestone-tasks-list tbody").append(element);
            }
        },

        getMilestoneDate: function (dependsOn) {
            var milestonePTLdate = this.timeLine.calculateEstimateTime(dependsOn);
            var milestoneDate = this.timeLine.toDate(milestonePTLdate);
            return milestoneDate;
        },

        hideSingleMilestoneEditView: function () {
            this.$el.remove();
        }
    });

    return SingleMilestoneEdit;
});