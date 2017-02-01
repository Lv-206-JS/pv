define(['backbone',
    'underscore',
    'JST',
    'Draggabilly',
    'moment',
    '../common/confirmDelete',
    'views/project/singleMilestoneEdit',
    '../modalView',
], function (Backbone, _, JST, Draggabilly, Moment, ConfirmDeleteView, SingleMilestoneEdit, ModalView) {
    'use strict';

    var MilestoneEditView = ConfirmDeleteView.extend({
        template: JST['project:milestoneEdit'],
        className: 'milestone-edit-view show-content',

        initialize: function (options) {
            this.model = options.model;
            this.milestones = options.milestones;
            this.tasks = this.model.get('tasks');
            this.moment = Moment;
            this.showModalView();
            this.bindMousetrap();
        },

        render: function render() {
            this.$el.html(this.template({
                milestones: this.model.get('milestones'),
                moment: this.moment
            }));
            return this;
        },

        events: {
            'click .cancel-button': 'hideModalView',
            'click .ok-button': 'saveChanges',
            'click .remove-milestone': 'showConfirmDeleteView',
            'dblclick .milestone-task-name': 'showSingleMilestone',
            'click #create-milestone, .edit-single-milestone': 'showSingleMilestone'
        },

        showSingleMilestone: function (event) {
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            var currentObj = {};
            for (var i = 0, len = this.milestones.length; i < len; i++) {
                if (milestoneName == this.milestones[i].name) {
                    currentObj = this.milestones[i];
                }
            }
            this.milestoneEdit = currentObj;
            this.tasksList = this.getTasksList(true);
            this.dependenciesList = this.getTasksList(false);
            this.singleMilestoneEdit = new SingleMilestoneEdit({
                model: this.model,
                milestones: this.milestones,
                milestone: this.milestoneEdit,
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList,
                currentName: milestoneName
            });
            this.singleMilestoneEdit.render();
            this.$el.append(this.singleMilestoneEdit.$el);
            this.listenTo(this.singleMilestoneEdit, 'showMilestoneChanges', this.render);
        },

        getTasksList: function (el) {
            var isNotDependency = [];
            var isDependency = [];
            var len = 0;
            if (this.milestoneEdit.dependsOn) {
                len = this.milestoneEdit.dependsOn.length;
            }
            for (var i = 0; i < this.tasks.length; i++) {
                var isCurrentDependensy = false;
                for (var j = 0; j < len; j++) {
                    if (this.tasks[i].taskId === this.milestoneEdit.dependsOn[j].taskId) {
                        isCurrentDependensy = true;
                        isDependency.push({name: this.tasks[i].name, taskId: this.tasks[i].taskId});
                    }
                }
                if (len === 0 || !isCurrentDependensy)
                    isNotDependency.push({name: this.tasks[i].name, taskId: this.tasks[i].taskId});
            }
            if (el) return isNotDependency;
            else return isDependency;
        },

        confirmDeleteMilestone: function onDeleteProject(e) {
            e.stopPropagation();
            ConfirmDeleteView(e, this, _.bind(this.deleteMilestone, this, e));
        },

        deleteMilestone: function (event) {
            event.preventDefault();
            var updatedMilestones = this.model.get('milestones');
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            for (var i = 0, len = updatedMilestones.length; i < len; i++) {
                if (milestoneName == updatedMilestones[i].name) {
                    updatedMilestones.splice(i, 1);
                    break;
                }
            }
            this.model.set({milestones: updatedMilestones});
            this.model.save({}, {
                success: function () {
                    this.updateMilestonesPopup();
                }.bind(this)
            });
        },

        updateMilestonesPopup: function () {
            this.render();
        },

        saveChanges: function () {
            this.model.save();
            this.hideModalView();
        }
    });

    return MilestoneEditView;
});