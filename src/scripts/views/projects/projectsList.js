define([
    'backbone',
    'jquery',
    'underscore',
    'JST'
], function (Backbone, $, _, JST) {
    'use strict';

    var ProjectsListView = Backbone.View.extend({
        template: JST['projects:projectsList'],
        className: 'projects-list',
        events: {
            'click .projects-list-item': 'onClick',
            'click #dbl-click-item': 'onDoubleClick',
            'click .projects-go-link': 'onSelectProject',
            'click .edit-project': 'onEditProject',
            'click .delete-project': 'onDeleteProject'
        },

        initialize: function (options) {
            this.collection = options.collection;
            this.activeId = options.activeId;
        },

        render: function render() {
            var projects = this.collection.toJSON();
            this.$el.html(this.template({projects: projects, activeId: this.activeId}));

            return this;
        },

        onClick: function onClick(e) {
            var id = this.getTargetId(e);
            Backbone.Events.trigger('selectProject', id);
        },

        onDoubleClick: function onDoubleClick(e) {
            var that = this;

            var timer = 0;
            var delay = 2000;
            var prevent = false;

            timer = setTimeout(function () {
                if (!prevent) {

                    that.onClick(e);

                }
                prevent = false;
            }, delay);

            clearTimeout(timer);
            prevent = true;

            that.onSelectProject(e);

        },


        onSelectProject: function (e) {
            var id = this.getTargetId(e);
            PV.router.navigate('project/' + id, {trigger: true});
        },

        onEditProject: function onEditProject(e) {
            var id = this.getTargetId(e);
            this.trigger('editProject', id);
        },

        //TODO Make confirmation popup

        onDeleteProject: function onDeleteProject(e) {
            e.stopPropagation();
            // Open confirmation popup
            // When OK call this function
            //When cancel remove confirmation popup
            this.onDeleteConfirm(e);
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