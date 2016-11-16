define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var GanttChartView = Backbone.View.extend({
        template: JST.GanttChartView,
        className: 'gantt-chart-view',
        events: {
            'click .go-to-project': 'onGoToProject'
        },

        render: function render() {
            var me = this;
            me.$el.html(me.template({}));
            return me;
        },

        onGoToProject: function onGoToProject() {
            PV.router.navigate('project/PROJECT-ID-HERE', {trigger: true});
        }
    });

    return GanttChartView;
});