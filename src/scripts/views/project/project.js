define([
    'backbone',
    'JST',
    'models/Project',
    '../common/mainMenu',
    'views/project/milestone',
    'views/project/infoBar',
    'views/project/attachments',
    'views/project/task',
    'views/project/milestoneEdit',
    'views/project/gantt',
    'views/project/tasksList',
    'views/project/ganttChart'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, InfoBarView, AttachmentsView, TaskView, MilestoneEditView, GanttContainerView, TasksListView, GanttChartView) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        template: JST['project:project'],
        className: 'main-project-view',

        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .show-attachments': 'showAttachmentsPopup',
            'click .edit-milestone': 'showMilestoneEditPopup'
        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));

        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        renderViews: function () {
            this.milestoneView = new MilestoneView().render();
            this.$el.find('#milestone-view-container').html(this.milestoneView.$el);

            this.ganttContainerView = new GanttContainerView({model: this.model}).render();
            this.$el.find('#gantt-view-container').html(this.ganttContainerView.$el);

            this.tasksListView = new TasksListView({model: this.model}).render();
            this.$el.find('.left-panel').html(this.tasksListView.$el);
            this.listenTo(this.tasksListView, 'showTaskEditPopup', this.showTaskEditPopup); //???
            this.listenTo(this.tasksListView, 'showTaskAddPopup', this.showTaskAddPopup); //???

            this.ganttChartView = new GanttChartView({model: this.model}).render();
            this.$el.find('.right-panel').html(this.ganttChartView.$el);

            this.infoBarView = new InfoBarView({model: this.model}).render();
            this.$el.find('#info-bar-view-container').html(this.infoBarView.$el);

            return this;
        },

        //move to ganttContainerView???
        showTaskEditPopup: function(allTasks,task){
            this.taskView = new TaskView({tasks: allTasks, task: task}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.$el.append(this.taskView.$el);
        },
        //move to ganttContainerView???
        showTaskAddPopup: function(allTasks){
            this.taskView = new TaskView({tasks: allTasks}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.$el.append(this.taskView.$el);
        },
        //move to ganttContainerView???
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
        //move to ganttContainerView???
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