
define([
    'jquery',
    'backbone',
    'JST'
], function ($, Backbone, JST) {
    'use strict';

    var MobileProjectsView = Backbone.View.extend({
        template: JST['projects:projectsListMobile'],
        className: 'mobile-projects-view',
        events: {
            'click .projects-list-item': 'onSelectProject'
        },

        initialize: function () {
            this.collection = PV.projectsCollection;
            this.collection.fetch();
            this.collection.off('sync');
            this.collection.on('sync', _.bind(this.onSync, this));
        },

        render: function render() {
            var projects = this.collection.toJSON();
            this.$el.html(this.template({projects: projects}));

            return this;
        },

        onSelectProject: function (e) {
            var id = this.getTargetId(e);

            PV.router.navigate('project/' + id, {trigger: true});
        },

        getTargetId: function getTargetId(e) {
            var target = $(e.currentTarget);

            return target.data('id');
        },

        onSync: function () {
            this.render();
        }

    });

    return MobileProjectsView;
});
