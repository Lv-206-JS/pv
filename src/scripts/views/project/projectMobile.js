/**
 * Created by Hazard on 21.01.2017.
 */

define([
    'backbone',
    'JST',
    'slideout',
    'models/Project',
    './projectInfoMobile',
    './tasksListMobile',
    './ganttChartMobile',
    './milestoneMobile',
    './resourcesMobile'


], function (Backbone, JST, Slideout, Model, ProjectInfoMobileView, TaskListMobileView, ChartMobileView, MilestoneMobileView, ResourceMobileView) {

    'use strict';

    var ProjectMobileView = Backbone.View.extend({
        template: JST['project:projectMobile'],
        className: 'mobile-project-view',
        events: {
            'click .toggle-button': 'showDrawer',
            'click .back-to-projects': 'onBackToProjects',
            'click .show-tasks-list': 'showTasksList',
            'click .show-ganttchart': 'showGanttchart',
            'click .show-milestones': 'showMilestones',
            'click .show-resources': 'showResources',
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
            this.showProjectInfo();
        },

        showDrawer: function showDrawer() {
            this.slideout.toggle();
        },

        onBackToProjects: function onBackToProjects() {
            PV.router.navigate('projects', {trigger: true});
        },

        showProjectInfo: function showProjectInfo() {
            this.projectInfoMobileView = new ProjectInfoMobileView({
                model: this.model
            });
            this.$el.find('.mobile-project-content').html(this.projectInfoMobileView.render().$el);
        },

        showTasksList: function showTasklist() {
            this.taskListMobileView = new TaskListMobileView({
                model: this.model
            });
            this.slideout.toggle();

            this.$el.find('.mobile-project-content').html(this.taskListMobileView.render().$el);
        },

        showGanttchart: function showGanttchart() {
            this.chartMobileView = new ChartMobileView({
                model: this.model
            });
            this.slideout.toggle();

            this.$el.find('.mobile-project-content').html(this.chartMobileView.render().$el);
        },

        showMilestones: function showMilestones() {
            this.milestoneMobileView = new MilestoneMobileView({
                model: this.model
            });
            this.slideout.toggle();

            this.$el.find('.mobile-project-content').html(this.milestoneMobileView.render().$el);
        },

        showResources: function showResources() {
            this.resourceMobileView = new ResourceMobileView({
                model: this.model
            });
            this.slideout.toggle();

            this.$el.find('.mobile-project-content').html(this.resourceMobileView.render().$el);
        },

        onSignOut: function onSingOut() {
            $.ajax({url: '/users/logout'});
            PV.userModel.clear().set(this.userModel.defaults);
            PV.router.navigate('/', {trigger: true});
        }
    });

    return ProjectMobileView;
});
