define([
    'backbone',
    'JST',
    'collections/Projects',
    'views/projects/ProjectsList',
    'views/projects/ProjectsAbout'
], function (Backbone, JST, ProjectCollection, ProjectsListView, ProjectsAboutView) {
    'use strict';

    var ProjectsAreaView = Backbone.View.extend({
        className: 'projects-area-view',
        template: JST['projects:ProjectsArea'],

        initialize: function () {
            this.collection = new ProjectCollection();
            this.collection.fetch();
            this.collection.on('sync', _.bind(this.onSync, this));

            Backbone.Events.on('selectProject', _.bind(this.onSelect, this))
        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        renderViews: function (id) {
            this.projectsListView = new ProjectsListView({collection: this.collection}).render();
            this.$el.find('.projects-list-block').html(this.projectsListView.$el);

            this.projectsAboutView = new ProjectsAboutView({model: this.collection.get(id)}).render();
            this.$el.find('.project-about-block').html(this.projectsAboutView.$el);

            return this;
        },

        onSync: function () {
            // this.$el.html('');
            this.renderViews(this.collection.first().get('id'));

        },

        onSelect: function (id) {
            this.renderViews(id);
        }
    });

    return ProjectsAreaView;
});