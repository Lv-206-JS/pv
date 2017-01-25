/**
 * Created by Hazard on 21.01.2017.
 */

define([
    'backbone',
    'JST',
    'slideout',
    'models/Project'

], function (Backbone, JST, Slideout, Model) {

    'use strict';

    var ProjectMobileView = Backbone.View.extend({
        template: JST['project:projectMobile'],
        className: 'mobile-project-view',
        events: {
            'click .toggle-button': 'showDrawer'
        },

        initialize: function (projectId) {

            this.projectId = projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));

        },

        render: function () {
            var project = this.model.toJSON();
            this.$el.html(this.template({projectId: project}));
            this.slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': 600,
                'tolerance': 70
            });

            return this;
        },

        onChange: function () {
            this.render();
        },

        showDrawer: function showDrawer() {

            this.slideout.toggle();
        }

    });

    return ProjectMobileView;
});
