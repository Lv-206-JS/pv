define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var GanttChartView = Backbone.View.extend({
        template: JST['project:ganttChart'],
        className: 'gantt-chart-view',
        events: {
            'click .go-to-project': 'onGoToProject'
        },

        render: function render() {
            this.$el.html(this.template({}));
            return this;
        },

        onGoToProject: function onGoToProject() {
            PV.router.navigate('project/PROJECT-ID-HERE', {trigger: true});
        }
    });

    return GanttChartView;
});