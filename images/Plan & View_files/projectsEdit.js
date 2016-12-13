
define([
    'backbone',
    'JST',
    'collections/Projects',
    'models/Project'
], function (Backbone, JST, projectsCollection, ProjectModel) {
    'use strict';

    var ProjectEditView = Backbone.View.extend({
        template: JST['projects:projectsEdit'],
        className: 'projects-edit-view',
        events: {
            // 'submit form': 'saveProject',
            'click .ok-button': 'saveProject',
            'click .cancel-button': 'exitEditProject'
        },

        initialize: function initialize(options) {
            this.model = options.model;
            // if (options.modelId === 'new') {
            //     this.model = new ProjectModel();
            //
            //     this.render();
            // } else {
            //     projectsCollection.fetch();
            //     projectsCollection.on('sync', _.bind(this.onSync, this));
            // }
        },

        render: function render() {
            this.$el.html(this.template({project: this.model.toJSON()}));

            return this;
        },

        onSync: function onSync() {
            this.model = projectsCollection.get(this.modelId);
            this.render();

        },

        saveProject: function saveProject(e) {
            e.preventDefault();
            var name = this.$el.find('#name').val();
            var description = this.$el.find('#description').val();
            var that = this;

            this.model.set({
                name: name,
                description: description
            });

            this.model.setUrl(this.model.get('id') || '');
            this.model.save().then(
                function(res) {
                    that.trigger('editedProject', that.model);
                    // projectsCollection.add(this.model);
                    // PV.router.navigate('projects', {trigger: true});
                },
                function(err) {
                    // Error handling
                    console.log(err);
                }
            );
        },
        exitEditProject: function(event){
            event.preventDefault();
            this.$el.remove();
            // this = null;
            // PV.router.navigate('projects', {trigger: true});
        }
    });

    return ProjectEditView;
});