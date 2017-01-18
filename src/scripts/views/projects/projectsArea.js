define([
    'backbone',
    'JST',
    'models/Project',
    'views/projects/projectsList',
    'views/projects/projectsAbout',
    './projectsEdit'
], function (
    Backbone,
    JST,
    ProjectModel,
    ProjectsListView,
    ProjectsAboutView,
    ProjectsEditPopup
) {
    'use strict';

    var ProjectsAreaView = Backbone.View.extend({
        className: 'projects-area-view',
        template: JST['projects:projectsArea'],

        events: {
            'click .create-project': 'onEditProject'
        },

        initialize: function () {
            this.collection = PV.projectsCollection;
            this.collection.fetch();
            this.collection.on('sync', _.bind(this.onSync, this));
            Backbone.Events.off('selectProject');
            Backbone.Events.on('selectProject', _.bind(this.onSelect, this));
        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        renderViews: function (id) {
            var model = this.collection.get(id);

            this.projectsListView = new ProjectsListView({collection: this.collection, activeId: id}).render();
            this.$el.find('.projects-list-block').html(this.projectsListView.$el);
            this.listenTo(this.projectsListView, 'editProject', this.onEditProject);

            this.projectsAboutView = new ProjectsAboutView({model: model}).render();
            this.$el.find('.project-about-block').html(this.projectsAboutView.$el);

            return this;
        },

        onSync: function () {
            return this.renderViews(this.collection.first().get('id'));

        },

        onSelect: function (id) {
            this.renderViews(id);
        },

        onEditProject: function onEditProject(id) {
            var model = this.collection.get(id) || new ProjectModel();

            this.projectsEditPopup = new ProjectsEditPopup({
                model: model
            });
            this.listenTo(this.projectsEditPopup, 'editedProject', this.onEditedProject);
            this.$el.find('.popup-container').html(this.projectsEditPopup.render().$el);

        },

        onEditedProject: function onEditedProject(model) {
            this.collection.add(model);
            this.renderViews(model);
            this.projectsEditPopup.remove();
            this.projectsEditPopup = null;
        }
    });

    return ProjectsAreaView;
});
