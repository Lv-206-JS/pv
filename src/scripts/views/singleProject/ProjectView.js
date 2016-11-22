define([
    'backbone',
    'JST',
    'models/ProjectModel',
    'views/common/MainMenuView',
    'views/singleProject/MilestoneView',
    'views/singleProject/GanttChartView',
    'views/singleProject/InfoBarView'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, GanttChartView, InfoBarView) {
    'use strict';

    var ProjectView = Backbone.View.extend({
        className: 'main-view', //change later to project-view(single)
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage'
        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('change', _.bind(this.onChange, this));
            this.renderViews();
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function render() {
            return this;
        },

        renderViews: function () {
            this.mainMenuView = new MainMenuView({name: this.model.get('name'), page: 'singleProject'}).render();
            this.$el.append(this.mainMenuView.$el);
            // Add loggedUser object to menu

            this.milestoneView = new MilestoneView().render();
            this.$el.append(this.milestoneView.$el);

            this.ganttChartView = new GanttChartView().render();
            this.$el.append(this.ganttChartView.$el);

            this.infoBarView = new InfoBarView().render();
            this.$el.append(this.infoBarView.$el);

            return this;
        },

        onChange: function () {
            this.$el.html('');
            this.renderViews();
        }
    });

    return ProjectView;
});