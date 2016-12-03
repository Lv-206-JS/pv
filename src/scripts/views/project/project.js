define([
    'backbone',
    'JST',
    'models/Project',
    '../common/mainMenu',
    'views/project/milestone',
    'views/project/infoBar',
    'views/project/tasksList',
    'views/project/task',
    'views/project/attachments'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, InfoBarView, TasksListView, TaskView, AttachmentsView) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        className: 'main-project-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',
            'click .show-attachments': 'showAttachmentsPopup'
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

            // this.ganttChartView = new GanttChartView().render();
            // this.$el.append(this.ganttChartView.$el);

            this.infoBarView = new InfoBarView({model: this.model}).render();
            this.$el.append(this.infoBarView.$el);

            return this;
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

        onChange: function () {
            Backbone.Events.trigger('onProjectNameReceived', this.model.get('name'));
            this.$el.html('');
            this.renderViews();
            if(this.model.whoChange == 'AttachmentsView') {
                return this.showAttachmentsPopup();
            }
        }
    });

    return ProjectView;
});