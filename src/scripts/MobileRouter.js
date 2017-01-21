define([
        'jquery',
        'backbone',
        'views/common/landingMobile',
        'views/common/loginMobile',
        'views/projects/projectsListMobile'
    ],
    function ($,
              Backbone,
              LandingMobileView,
              LoginMobileView,
              MobileProjectsView) {
        'use strict';

        var MobileRouter = Backbone.Router.extend({
            routes: {
                'projects': 'openProjects',
                'project/:projectId': 'openSingleProject',
                'project/:projectId/task/:taskId': 'openProjectAndTask',
                'login': 'loginMobileForm',
                '*path': 'openLandingMobilePage'
            },

            openLandingMobilePage: function openLandingMobilePage() {

                this.landingMobileView = new LandingMobileView();
                $('body').html(this.landingMobileView.render().$el);
            },


            openProjects: function () {

                console.log('MobileProjectsView = ' + MobileProjectsView);
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
            },

            openProjectAndTask: function openProjectAndTask(projectId) {
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
