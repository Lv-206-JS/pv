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
    'views/project/projectPrice',
    'timeLine',
    'moment',
    'TaskAlgorithm',
    'undoRedoAlgorithm'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, GanttContainerView, TasksListView, TaskView, GanttChartView, InfoBarView, AttachmentsView, SettingsView, MilestoneEditView, OwnershipView, ResourcesView, ProjectPriceView, TimeLineLib, Moment, TaskAlgorithm, UndoRedoAlgorithm) {

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
            'click .tool-price': 'showProjectPrice',
            'click .show-ownership': 'showOwnershipPopup',
            'click .tool-zoom-in' : 'increaseZoom',
            'click .tool-zoom-out' : 'decreaseZoom',
            'click .tool-undo' : 'setUndo',
            'click .tool-redo' : 'setRedo',
            'click .tool-fit' : 'fitProjectToScreen'
        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.page = options.page;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));
            this.moment = Moment;
            this.flagSchedule = true;
            this.undoRedo = new UndoRedoAlgorithm();
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
            this.infoBarView = new InfoBarView({
                model: this.model,
                el: this.$el.find('#info-bar-view-container')[0]
            }).render();
            this.ganttContainerView = new GanttContainerView({
                model: this.model,
                el: this.$el.find('#gantt-view-container')[0]
            }).render();
            this.listenTo(this.ganttContainerView.tasksListView, 'showTaskEditPopup', this.showTaskEditPopup);
            this.listenTo(this.ganttContainerView.tasksListView, 'showTaskAddPopup', this.showTaskAddPopup);
            return this;
        },

        showTaskEditPopup: function (allTasks, task) {
            var resources = this.model.get('resources');
            this.taskView = new TaskView({
                tasks: allTasks,
                task: task,
                resources: resources,
                model: this.model
            }).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.listenTo(this.taskView, 'deleteTask', this.deleteTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        showTaskAddPopup: function (allTasks) {
            var resources = this.model.get('resources');
            this.taskView = new TaskView({
                tasks: allTasks,
                resources: resources
            }).render();
            this.listenTo(this.taskView, 'upsertTask', this.upsertTaskHandler);
            this.listenTo(this.taskView, 'deleteTask', this.deleteTaskHandler);
            this.$el.append(this.taskView.$el);
        },

        deleteTaskHandler: function (allTasks) {
            this.model.set('tasks', allTasks);
            this.model.save();
        },

        upsertTaskHandler: function (allTasks, changedTask) {
            if (changedTask.taskId)
                for (var i = 0; i < allTasks.length; i++) {
                    if (allTasks[i].taskId === changedTask.taskId) {
                        allTasks[i] = changedTask;
                    }
                }
            else {
                allTasks[allTasks.length] = changedTask;
                allTasks[allTasks.length - 1].taskId = this.createId(allTasks);
            }
            this.model.set('tasks', allTasks);
            this.model.save();
        },

        increaseZoom: function () {
            this.ganttContainerView.increaseZoom();
        },

        decreaseZoom: function () {
            this.ganttContainerView.decreaseZoom();
        },

        fitProjectToScreen: function(){
            this.ganttContainerView.fitProjectToScreen();
        },

        createId: function(allTasks){
            var max = 0;
            for (var i = 0; i < allTasks.length - 1; i++) {
                if (max < allTasks[i].taskId)
                    max = allTasks[i].taskId;
            }
            return ++max;
        },

        showAttachmentsPopup: function () {
            var attachments = this.model.get('attachments');
            this.attachmentsView = new AttachmentsView({
                model: this.model,
                attachments: attachments
            });

            this.attachmentsView.render();
            this.$el.append(this.attachmentsView.$el);
        },

        showSettingsPopup: function () {
            this.settingsView = new SettingsView({
                model: this.model
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
            this.listenTo(this.resourcesView, 'saveResources', this.saveResources);
            this.$el.append(this.resourcesView.$el);
        },

        saveResources: function (resources) {
            this.model.set('resources', resources);
            this.model.save();
        },

        showProjectPrice: function () {
            this.projectPriceView = new ProjectPriceView({model: this.model}).render();
            this.$el.append(this.projectPriceView.$el);
        },

        updateProjectName: function (name) {
            this.$el.find('.show-project-name').html(name);
        },

        setUndo: function () {
            if ($('#undo').attr('disabled')) {
            }
            else {
                var newModel = this.undoRedo.undo();
                this.hideButton('#undo');
                this.showButton('#redo');
                this.setNewAttributes(newModel);
                this.renderViews();
                this.updateProjectName(this.model.get('name'));
            }
        },

        setNewAttributes: function (model) {
            var newAttributes = model;
            var properties = [];
            for(var prop in newAttributes){
                properties[properties.length] = prop;
            }
            for(var i = 0; i < properties.length; i++){
                this.model.set(properties[i],newAttributes[properties[i]]);
            }
        },

        setRedo: function () {
            if ($('#redo').attr('disabled')) {
            }
            else {
                var newModel = this.undoRedo.redo();
                this.showButton('#undo');
                this.hideButton('#redo');
                // this.model = newModel;
                this.setNewAttributes(newModel);
                this.renderViews();
                this.updateProjectName(this.model.get('name'));
            }
        },

        hideButton: function (buttonId) {
            if (buttonId === '#undo') {
                if (this.undoRedo.iterator == 1) {
                    $('#undo').attr('disabled', 'disabled');
                }
            }
            else if (buttonId === '#redo') {
                if (this.undoRedo.iterator == this.undoRedo.history.length) {
                    $('#redo').attr('disabled', 'disabled');
                }
            }
        },

        showButton: function (buttonId) {
            if (buttonId === '#undo') {
                if (this.undoRedo.iterator > 1) {
                    $('#undo').attr('disabled', null);
                }
            }
            else if (buttonId === '#redo') {
                if (this.undoRedo.iterator != this.undoRedo.history.length) {
                    $('#redo').attr('disabled', null);
                }
            }
        },

        startDateSchedule: function () {
            this.taskAlgorithm = new TaskAlgorithm({model: this.model, me: this});
            var updateTasks = this.taskAlgorithm.startAlgorithm();
            this.model.set({tasks: updateTasks});
            this.model.save();
            this.flagSchedule = false;
        },

        onChange: function () {
            if (this.flagSchedule) {
                this.startDateSchedule();
            }
            else {
                this.flagSchedule = true;
                this.undoRedo.save(this.model.attributes);
                if (this.undoRedo.history.length > 1) {
                    $('#undo').attr('disabled', null);
                    this.hideButton('#redo');
                }
                this.renderViews();
                Backbone.Events.trigger('onProjectNameReceived', this.model.get('name'));
                this.updateProjectName(this.model.get('name'));
            }

        }
    });

    return ProjectView;
});