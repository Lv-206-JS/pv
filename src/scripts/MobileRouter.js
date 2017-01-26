define([
        'jquery',
        'backbone',
        'views/common/landingMobile',
        'views/common/loginMobile',
        'views/projects/projectsListMobile',
        'views/project/projectMobile',
        'views/project/taskListMobile'
    ],
    function ($,
              Backbone,
              LandingMobileView,
              LoginMobileView,
              MobileProjectsView,
              ProjectMobileView,
              TaskListMobileView
    ) {
        'use strict';

        var MobileRouter = Backbone.Router.extend({
            routes: {
                'projects': 'openProjects',
                'project/:projectId': 'openSingleProject',
                'project/:projectId/task/:taskId': 'openTask',
                'login': 'loginMobileForm',
                '*path': 'openLandingMobilePage'
            },

            openLandingMobilePage: function openLandingMobilePage() {

                this.landingMobileView = new LandingMobileView();
                $('body').html(this.landingMobileView.render().$el);
            },


            openProjects: function () {

                //If view exists kill it!!!
                if (this.loginMobileView) {
                    this.loginMobileView.remove();
                    this.loginMobileView = null;
                }

                // Create new view.
                if (!this.mobileProjectsView) {
                    this.mobileProjectsView = new MobileProjectsView();
                }
                $('body').html(this.mobileProjectsView.$el);

            },

            openSingleProject: function openSingleProject(projectId) {
                // If view exists kill it!!!
                if (this.mobileProjectsView) {
                    this.mobileProjectsView.remove();
                    this.mobileProjectsView = null;
                }

                if (!this.projectMobileView) {
                    // Create new view.
                    this.projectMobileView = new ProjectMobileView(projectId);
                }
                $('body').html(this.projectMobileView.$el);
            },

            openTask: function openTask(projectId) {

                if (this.projectMobileView) {
                    this.projectMobileView.remove();
                    this.projectMobileView = null;
                }

                if (!this.taskListMobileView) {
                    // Create new view.
                    this.taskListMobileView = new TaskListMobileView(projectId);
                }
                $('body').html(this.taskListMobileView.render().$el);
            },

            loginMobileForm: function loginMobileForm() {
                if (this.loginMobileView) {
                    this.loginMobileView.remove();
                    this.loginMobileView = null;
                }
                this.loginMobileView = new LoginMobileView();

                $('body').html(this.loginMobileView.render().$el);

            }

        });

        return MobileRouter;
    }
);
