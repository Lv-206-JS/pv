define([
    'backbone',
    'JST',
    'models/Project',
    '../common/mainMenu',
    'views/project/milestone',
    'views/project/ganttChart',
    'views/project/infoBar'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, GanttChartView, InfoBarView) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        className: 'main-project-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage'
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

            this.ganttChartView = new GanttChartView().render();
            this.$el.append(this.ganttChartView.$el);

            this.infoBarView = new InfoBarView({model: this.model}).render();
            this.$el.append(this.infoBarView.$el);

            return this;
        },

        onChange: function () {
            Backbone.Events.trigger('onProjectNameReceived', this.model.get('name'));
            this.$el.html('');
            this.renderViews();
        }
    });

    return ProjectView;
});