define([
    'backbone',
    'JST',
    '../models/ProjectModel',
    'views/MainMenuView',
    'views/MilestoneView',
    'views/GanttChartView',
    'views/InfoBarView'
], function (Backbone, JST, Model, MainMenuView, MilestoneView, GanttChartView, InfoBarView) {
    'use strict';

    var MainView = Backbone.View.extend({
        className: 'main-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage'
        },

        initialize: function (options) {
            this.projectId = options.projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('change', _.bind(this.onChange, this));
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function render() {
            return this;
        },

        renderViews: function () {
            var me = this;

            me.mainMenu = new MainMenuView({name: this.model.get('name')}).render();
            me.$el.append(me.mainMenu.$el);

            me.milestoneView = new MilestoneView().render();
            me.$el.append(me.milestoneView.$el);

            me.ganttChartView = new GanttChartView().render();
            me.$el.append(me.ganttChartView.$el);

            me.infoBarView = new InfoBarView().render();
            me.$el.append(me.infoBarView.$el);

            return me;
        },

        onChange: function () {
            this.renderViews();
        }
    });

    return MainView;
});