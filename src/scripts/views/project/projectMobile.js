/**
 * Created by Hazard on 21.01.2017.
 */

define([
    'backbone',
    'JST',
    'models/Project'

], function (Backbone, JST, Model) {

    'use strict';

    var ProjectMobileView = Backbone.View.extend({
        template: JST['project:projectMobile'],
        className: 'mobile-project-view',

        events: {
            'click .back-to-landing-view': 'onBackToLandingPage',

        },

        initialize: function (options) {

            this.projectId = options.projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));
        },

        render: function () {
            var project = this.model.toJSON();
            this.$el.html(this.template({projectId: project}));
            return this;
        },

        onBackToLandingPage: function onBackToLandingPage() {
            PV.router.navigate('/', {trigger: true});
        },

        onChange: function () {
            this.render();
        }


    });

    return ProjectMobileView;
});
