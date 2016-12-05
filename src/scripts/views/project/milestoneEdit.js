define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var MilestoneEditView = Backbone.View.extend({
        template: JST['project:milestoneEdit'],
        className: 'milestone-edit-view show-content',

        initialize: function (options) {
            this.model = options.model;
            this.milestones = options.milestones;
            this.tasks = this.model.get('tasks');
        },

        render: function render(currentObj) {
            this.$el.html(this.template({milestones: this.milestones,
                tasks: this.tasks,
                milestoneEdit: currentObj || {name:'', date:''}}));
            return this;
        },

        events: {
            'click .ok-button' : 'hideMilestoneEditView',
            'dblclick .milestone-item' : 'getEditView',
            'click #create-milestone': 'getEditView',
            'click .tab-milestone-list': 'getMilestoneListView',
            'click .save-milestones-button' : 'saveMilestoneSettings',
            'click #delete-milestone' : 'deleteMilestone'
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
            console.log(currentObj);
            this.render(currentObj);
            this.$el.find('.tab-edit').addClass('active');
            this.$el.find('.tab-milestone-list').removeClass('active');
            this.$el.find('.save-milestones-button').addClass('active');
            this.$el.find('.milestone-list-content').removeClass('show-content-milestone');
            this.$el.find('.milestone-list-content').addClass('hide-content-milestone');
            this.$el.find('.edit-content').removeClass('hide-content-milestone');
            this.$el.find('.edit-content').addClass('show-content-milestone');
            this.$el.find('.tab-edit').removeClass('hide-content-milestone');
            this.$el.find('.tab-edit').addClass('show-content-milestone');
            this.$el.find('.save-milestones-button').removeClass('hide-content-milestone');
            this.$el.find('.save-milestones-button').addClass('show-content-milestone');
        },

        getMilestoneListView: function () {
            this.$el.find('.tab-milestone-list').addClass('active');
            this.$el.find('.tab-edit').removeClass('active');
            this.$el.find('.save-milestones-button').removeClass('active');
            this.$el.find('.tab-edit').removeClass('show-content-milestone');
            this.$el.find('.tab-edit').addClass('hide-content-milestone');
            this.$el.find('.save-milestones-button').removeClass('show-content-milestone');
            this.$el.find('.save-milestones-button').addClass('hide-content-milestone');
            this.$el.find('.edit-content').removeClass('show-content-milestone');
            this.$el.find('.edit-content').addClass('hide-content-milestone');
            this.$el.find('.milestone-list-content').removeClass('hide-content-milestone');
            this.$el.find('.milestone-list-content').addClass('show-content-milestone');
        },

        saveMilestoneSettings: function (event) {
            var updatedMilestones = this.model.get('milestones');
            var newName = this.$el.find('#milestone-settings-name').val();
            var newDate = this.$el.find('#milestone-settings-date').val();
            var target = $(event.currentTarget);
            var milestoneName = target.data('name');
            if(milestoneName == '') {
                updatedMilestones.push({
                    name: newName,
                    date: newDate
                });
            }
            else {
                var currentObj = {
                    name: newName,
                    date: newDate
                };
                for (var i = 0, len = updatedMilestones.length; i < len; i++) {
                    if(milestoneName == updatedMilestones[i].name) {
                        updatedMilestones[i] = currentObj;
                    }
                }
            }
            this.model.set({milestones:updatedMilestones});
            this.model.save({
                success:function () {
                    this.updateMilestonesPopup();
                }.call(this),

                error:function () {
                    console.log('error');
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
                    console.log('error');
                }
            });
            this.model.whoChange = 'MilestoneEditView'
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