define([
    'backbone',
    'JST',
    'models/Project',
    '../common/mainMenu',
    'views/project/milestone',
    'views/project/infoBar',
    'views/project/tasksList',
    'views/project/attachments',
    'views/project/task',
    'views/project/settings',
    'views/project/milestoneEdit'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, InfoBarView, TasksListView, TaskView, AttachmentsView, SettingsView, MilestoneEditView) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        className: 'main-project-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .show-attachments': 'showAttachmentsPopup',
            'click .show-settings': 'showSettingsPopup',
            'click .edit-milestone': 'showMilestoneEditPopup'

        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));
            this.renderViews();
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function render() {
            return this;
        },

        renderViews: function () {
            this.milestoneView = new MilestoneView().render();
            this.$el.append(this.milestoneView.$el);

            this.tasksListView = new TasksListView({tasks: this.model.get('tasks')}).render();
            this.$el.append(this.tasksListView.$el);

            this.listenTo(this.tasksListView, 'showTaskEditPopup', this.showTaskEditPopup);
            this.listenTo(this.tasksListView, 'showTaskAddPopup', this.showTaskAddPopup);

            // this.ganttChartView = new GanttChartView().render();
            // this.$el.append(this.ganttChartView.$el);

            this.infoBarView = new InfoBarView({model: this.model}).render();
            this.$el.append(this.infoBarView.$el);

            return this;
        },

        showTaskEditPopup: function(allTasks,task){
            this.taskView = new TaskView({tasks: allTasks, task: task}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        showTaskAddPopup: function(allTasks){
            this.taskView = new TaskView({tasks: allTasks}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        upsertTaskHandler: function (allTasks,changedTask){
            if (changedTask.taskId)
                for (var i = 0; i < allTasks.length; i++){
                    if (allTasks[i].taskId === changedTask.taskId){
                        allTasks[i] = changedTask;
                    }
                }
            else
            {
                allTasks[allTasks.length] = changedTask;
                allTasks[allTasks.length-1].taskId = this.createId(allTasks);
            }
            this.model.set('tasks',allTasks);
            this.model.save();
        },

        createId: function(allTasks){
            var max = 0;
            for (var i = 0; i < allTasks.length-1; i++){
                if (max < allTasks[i].taskId )
                    max = allTasks[i].taskId;
            }
            return ++max;
        },

        showAttachmentsPopup: function(){
            var attachments = this.model.get('attachments');
            this.attachmentsView = new AttachmentsView({
                model: this.model,
                attachments: attachments
            });

            this.attachmentsView.render();
            this.$el.append(this.attachmentsView.$el);
        },


        showSettingsPopup: function() {
            this.settingsView = new SettingsView({
                model: this.model,
                settings: this.model.get('settings')
            });


            this.settingsView.render();
            this.$el.append(this.settingsView.$el);
        },

        showMilestoneEditPopup: function () {
            var milestones = this.model.get('milestones');
            this.milestoneEditView = new MilestoneEditView({
                model: this.model,
                milestones: milestones
            });
            this.milestoneEditView.render();
            this.$el.append(this.milestoneEditView.$el);

        },

        onChange: function () {
            Backbone.Events.trigger('onProjectNameReceived', this.model.get('name'));
            this.$el.html('');
            this.renderViews();
            if(this.model.whoChange == 'AttachmentsView') {
                return this.showAttachmentsPopup();
            }
            else if(this.model.whoChange == 'MilestoneEditView') {
                return this.showMilestoneEditPopup();
            }
        }
    });

    return ProjectView;
});