define([
    'backbone',
    'JST',
    'views/MainMenuView',
    'views/MilestoneView',
    'views/GanttChartView',
    'views/InfoBarView'
], function (Backbone, JST, MainMenuView, MilestoneView, GanttChartView, InfoBarView) {
    'use strict';

    var MainView = Backbone.View.extend({
        className: 'main-view',
        events: {
            'click .back-to-landing-view': 'onBackToLandingPage'
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        render: function render() {
            var me = this;

            me.mainMenu = new MainMenuView().render();
            me.$el.append(me.mainMenu.$el);

            me.milestoneView = new MilestoneView().render();
            me.$el.append(me.milestoneView.$el);

            me.ganttChartView = new GanttChartView().render();
            me.$el.append(me.ganttChartView.$el);

            me.infoBarView = new InfoBarView().render();
            me.$el.append(me.infoBarView.$el);

            return me;
        }
    });

    return MainView;
});