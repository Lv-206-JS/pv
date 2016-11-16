define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST.LandingView,
        className: 'landing-view',
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

    return LandingView;
});