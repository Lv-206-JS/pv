/**
 * Created by Hazard on 21.01.2017.
 */

define([
    'backbone',
    'JST',
    'slideout',
    'models/Project',
    './tasksListMobile'

], function (Backbone, JST, Slideout, Model, TaskListMobileView) {

    'use strict';

    var ProjectMobileView = Backbone.View.extend({
        template: JST['project:projectMobile'],
        className: 'mobile-project-view',
        events: {
            'click .toggle-button': 'showDrawer',
            'click .back-to-projects': 'onBackToProjects',
            'click .show-task-list': 'showTaskList',
            'click .sign-out-button': 'onSignOut'
        },

        initialize: function (projectId) {
            this.userModel = PV.userModel;
            this.userModel.setUrl('/rest/user');
            this.userModel.fetch();
            this.projectId = projectId;
            this.model = new Model();
            this.model.setUrl(this.projectId);
            this.model.fetch();
            this.model.on('sync', _.bind(this.onChange, this));
        },

        render: function () {
            var project = this.model.toJSON();
            console.log(project);
            this.$el.html(this.template({project: project}));
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
        },

        onBackToProjects: function onBackToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        showTaskList: function showTasklist() {
            this.taskListMobileView = new TaskListMobileView({
                model:this.model
            });
            this.slideout.toggle();

            this.$el.find('.mobile-project-content').html(this.taskListMobileView.render().$el);
        },

        renderTasks: function (projectId) {
            this.projectMobileView = new ProjectMobileView({projectId: projectId}).render();
            this.$el.find('.mobile-project-content').html(this.projectMobileView.$el);
        },

        onSignOut: function onSingOut() {
            $.ajax({url: '/users/logout'});
            PV.userModel.clear().set(this.userModel.defaults);
            PV.router.navigate('/', {trigger: true});
        }
    });

    return ProjectMobileView;
});
