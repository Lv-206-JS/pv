
define([
    'backbone',
    'backbone-validation',
    'JST',
    'collections/Projects',
    'models/Project'
], function (Backbone, BackboneValidation, JST, projectsCollection, ProjectModel) {
    'use strict';

    var ProjectEditView = Backbone.View.extend({
        template: JST['projects:projectsEdit'],
        className: 'projects-edit-view',
        events: {
            'click .ok-button': 'saveProject',
            'click .cancel-button': 'exitEditProject'
        },

        initialize: function initialize(options) {
            this.model = options.model;
            Backbone.Validation.bind(this);
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

            if (this.model.isValid(['name', 'description'])) {
                this.model.save().then(
                    function(res) {
                        that.trigger('editedProject', that.model);
                        that.toJSON();

                    },
                    function(error) {
                        // Error handling
                        console.log(error);
                    }
                );
            } else {
                this.handleErrors();
            }

        },

        handleErrors: function () {
            var errors = this.model.validate();
            var inputs = this.$el.find('.form-control');

            _.each(inputs, function(input) {
                var inputName = $(input).attr('name');

                if (errors[inputName]) {
                    $(input).attr('placeholder', errors[inputName]);
                }
            });
        },

        exitEditProject: function(event){
            event.preventDefault();
            this.$el.remove();
        },

    });

    return ProjectEditView;
});
