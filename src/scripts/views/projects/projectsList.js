define([
    'backbone',
    'jquery',
    'underscore',
    'JST',
    '../common/confirmDelete'
], function (Backbone, $, _, JST, ConfirmDeleteView) {
    'use strict';

    var ProjectsListView = Backbone.View.extend({
        template: JST['projects:projectsList'],
        className: 'projects-list',
        events: {
            'click .projects-list-item': 'onClick',
            'click .projects-go-link': 'onSelectProject',
            'click .icon-edit': 'onEditProject',
            'click .icon-remove': 'onDeleteProject'
        },

        initialize: function (options) {
            this.collection = options.collection;
            this.activeId = options.activeId;
            this.clickTimer = null;
        },

        render: function render() {
            var projects = this.collection.toJSON();
            this.$el.html(this.template({projects: projects, activeId: this.activeId}));

            return this;
        },

        onClick: function onClick(e) {
            var id = this.getTargetId(e);
            if (!this.clickTimer ) {
                this.clickTimer = setTimeout(function () {
                    Backbone.Events.trigger('selectProject', id);
                }, 500);
            } else {
                clearTimeout(this.clickTimer);
                this.clickTimer = null;
                this.onSelectProject(e);
            }
        },

        onSelectProject: function (e) {
            var id = this.getTargetId(e);
            PV.router.navigate('project/' + id, {trigger: true});
        },

        onEditProject: function onEditProject(e) {
            var id = this.getTargetId(e);
            this.trigger('editProject', id);
        },

        onDeleteProject: function onDeleteProject(e) {
            e.stopPropagation();
            ConfirmDeleteView(e, this, _.bind(this.onDeleteConfirm, this, e));
        },

        onDeleteConfirm: function onDeleteProject(e) {
            var that = this;
            var id = this.getTargetId(e);
            var model = this.collection.get(id);

            model.setUrl(model.get('id'));
            model.destroy().always(
                function () {
                    that.render();
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
