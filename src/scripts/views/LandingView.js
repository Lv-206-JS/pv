define(['backbone', 'JST'], function (Backbone, JST) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST.LandingView,
        className: 'landing-view',
        events: {
            'click .go-to-projects': 'onGoToProjects'
        },

        render: function render() {
            var me = this;
            me.$el.html(me.template({}));
            return me;
        },

        onGoToProjects: function onGoToProjects() {
            PV.router.navigate('projects', {trigger: true});
        }
    });

    return LandingView;
});