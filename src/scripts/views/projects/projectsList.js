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
            var id = this.getTargetId(e);
            Backbone.Events.trigger('selectProject', id);
        },

        onSelectProject: function (e) {
            var id = this.getTargetId(e);
            PV.router.navigate('project/' + id, {trigger: true});
        },

        //TODO OpenPopup for Projects Edit

        onEditProject: function onEditProject(e) {
            var id = this.getTargetId(e);
            PV.router.navigate('projects/' + id, {trigger: true});
        },

        onDeleteProject: function onDeleteProject(e) {
            e.stopPropagation();
            var id = this.getTargetId(e);
            var model = this.collection.get(id);

            model.setUrl(model.get('id'));
            model.destroy().then(

                function (resp) {
                    console.log(this.collection);
                    // TODO Re-render view.
                    this.render();

                }

            );
        },

        getTargetId: function getTargetId(e) {
            var target = $(e.currentTarget);

            return target.data('id');
        }
    });

    return ProjectsListView;
});