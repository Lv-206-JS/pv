define([
    'backbone',
    'JST',
    'models/Project',
    '../common/mainMenu',
    'views/project/milestone',
    'views/project/gantt',
    'views/project/tasksList',
    'views/project/task',
    'views/project/ganttChart',
    'views/project/infoBar',
    'views/project/attachments',
    'views/project/settings',
    'views/project/milestoneEdit',
    'views/project/ownership',
    'views/project/resources',
    'timeLine',
    'moment'

], function (Backbone, JST, Model, MainMenuView, MilestoneView, GanttContainerView, TasksListView, TaskView, GanttChartView, InfoBarView, AttachmentsView, SettingsView, MilestoneEditView, OwnershipView, ResourcesView, TimeLineLib, Moment) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        template: JST['project:project'],
        className: 'main-project-view',

        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .show-attachments': 'showAttachmentsPopup',
            'click .show-settings': 'showSettingsPopup',
            'click .edit-milestone': 'showMilestoneEditPopup',
            'click .show-resources': 'showResourcesPopup',
            'click .show-ownership': 'showOwnershipPopup',
            'click .tool-zoom-in' : 'increaseZoom',
            'click .tool-zoom-out' : 'decreaseZoom'
        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.page = options.page;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));
            //TODO move events unsubscription to destroy method
            Backbone.Events.off('onProjectNameReceived');
            Backbone.Events.on('onProjectNameReceived', _.bind(this.updateProjectName, this));
            this.zoom = 100; // zoom value in %
            this.hourLength = 6; // hour length in px
            this.moment = Moment;

        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function () {
            this.$el.html(this.template({
                page: this.page
            }));
            return this;
        },

        renderViews: function () {
            this.milestoneView = new MilestoneView({
                model: this.model,
                el: this.$el.find('#milestone-view-container')[0]
            }).render();
            // this.$el.find('#milestone-view-container').html(this.milestoneView.$el);

            this.infoBarView = new InfoBarView({model: this.model}).render();
            this.$el.find('#info-bar-view-container').html(this.infoBarView.$el);

            //TODO change rendering el passing
            this.ganttContainerView = new GanttContainerView({model: this.model}).render();
            this.$el.find('#gantt-view-container').html(this.ganttContainerView.$el);

            this.tasksListView = new TasksListView({model: this.model}).render();
            this.$el.find('#task-container').html(this.tasksListView.$el);
            this.listenTo(this.tasksListView, 'showTaskEditPopup', this.showTaskEditPopup);
            this.listenTo(this.tasksListView, 'showTaskAddPopup', this.showTaskAddPopup);

            //TODO move to ganttchart view
            this.findPositionsForTasks();

            this.ganttContainerView.scrollMove();

            return this;
        },

        showTaskEditPopup: function(allTasks,task){
            var resources = this.model.get('resources');
            this.taskView = new TaskView({tasks: allTasks, task: task, resources: resources}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.listenTo(this.taskView, 'deleteTask', this.deleteTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        showTaskAddPopup: function(allTasks){
            var resources = this.model.get('resources');
            this.taskView = new TaskView({tasks: allTasks, resources: resources}).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.listenTo(this.taskView, 'deleteTask', this.deleteTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        deleteTaskHandler: function(allTasks){
            this.model.set('tasks',allTasks);
            this.model.save();
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
            console.log('all tasks before saving');
            console.log(allTasks);
            this.model.set('tasks',allTasks);
            this.model.save();
            var tasks = this.model.get('tasks');
            console.log('all tasks after saving');
            console.log(tasks);
        },

        increaseZoom: function(){
            if(this.zoom < 200) {
                this.zoom += 20;
                this.findPositionsForTasks(true);
                document.getElementById('zoom-value').innerHTML = this.zoom + "%";
            }
        },

        decreaseZoom: function(){
            if(this.zoom > 20) {
                this.zoom -= 20;
                this.findPositionsForTasks(false);
                document.getElementById('zoom-value').innerHTML = this.zoom + "%";
            }
        },

        findPositionsForTasks: function(trigger){
            var tasks = this.model.get('tasks');
            var timeLine = new TimeLineLib(this.model);
            var tasksPositions = [];
            //change width of 1 hour
            if( trigger === true) {
                this.hourLength *= 2;
            } else if (trigger === false) {
                this.hourLength /= 2;
            }
            for(var i = 0; i < tasks.length; i++){
                var singleTask = {taskId: tasks[i].taskId, singleTaskPositions: []};
                var task = timeLine.getWorkDays(tasks[i].startDate,tasks[i].estimateTime);
                var projectStartDate = timeLine.toDate(0);
                for( var j = 0; j < task.length; j++){
                    var days = this.moment.duration(task[j].realDate - projectStartDate,'seconds').asDays();
                    days = days - days % 1;
                    var settings = this.model.get('settings');
                    var workingHoursPerDay = this.moment.duration(+settings.dayDuration,'seconds').asHours();
                    var notWorkingHours = days * (24 - workingHoursPerDay);
                    var newTaskStart = task[j].realDate - projectStartDate - notWorkingHours*3600;
                    var positionX = (newTaskStart)*(this.hourLength/3600);
                    var width = (task[j].workHours)*(this.hourLength/3600);
                    singleTask.singleTaskPositions[j] = {positionX: positionX, width: width};
                }
                tasksPositions[tasksPositions.length] = singleTask;
            }
            this.ganttChartView = new GanttChartView({
                model: this.model, tasksPositions: tasksPositions,
                zoom: this.zoom, hourLength: this.hourLength
            }).render();
            this.$el.find('#gantt-chart-container').html(this.ganttChartView.$el);
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

        showOwnershipPopup: function () {
            this.ownershipView = new OwnershipView({
                projectId: this.projectId
            });
            this.ownershipView.render();
            this.$el.append(this.ownershipView.$el);
        },

        showResourcesPopup: function () {
            var resources = this.model.get('resources');
            this.resourcesView = new ResourcesView({resources: resources, model: this.model}).render();
            this.$el.append(this.resourcesView.$el);
        },

        updateProjectName: function (name) {
            this.$el.find('.show-project-name').html(name);
        },

        onChange: function () {
            //TODO Change to handle model change event.
            Backbone.Events.trigger('onProjectNameReceived', this.model.get('name'));
            this.renderViews();
        }
    });

    return ProjectView;
});