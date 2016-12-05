define([
    'backbone',
    'jquery',
    'underscore',
    'JST'
], function (Backbone, $,  _, JST) {
    'use strict';

    var ProjectsListView = Backbone.View.extend({
        template: JST['projects:projectsList'],
        className: 'projects-list',
        events: {
            'click .projects-list-item': 'onClick',
            'click .projects-list-link': 'onSelectProject',
            'click .edit-project': 'onEditProject',
            'click .delete-project' : 'onDeleteProject'
        },

        initialize: function (options) {
            this.collection = options.collection;
        },

        render: function render() {
            var projects = this.collection.toJSON();
            this.$el.html(this.template({projects: projects}));

            return this;
        },

        onClick: function (e) {
            var target = $(e.currentTarget);
            var id = target.data('id');
            Backbone.Events.trigger('selectProject', id);
        },

        onSelectProject: function (e) {
            var target = $(e.currentTarget);
            var id = target.data('id');
            PV.router.navigate('project/' + id, {trigger: true});
        },

        onEditProject: function onEditProject() {
            PV.router.navigate('projects/update', {trigger: true});
        },

        onDeleteProject: function (e) {
            var target = $(e.currentTarget);
            var id = target.data('id');
            var model = this.collection.get(id);

            model.setUrl(model.get('id'));
            model.destroy().then(
                function (resp) {
                    console.log(this.collection);
                    // Re render view.
                    render();

                }

            );
        }
    });

    return ProjectsListView;
});