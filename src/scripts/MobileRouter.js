define([
        'jquery',
        'backbone',
        'views/common/landingMobile',
        'views/common/loginMobile'
    ],
    function ($,
              Backbone,
              LandingMobileView,
              LoginMobileView
    ) {
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
                if (this.mainMobileView) {
                    this.mainMobileView.remove();
                    this.mainMobileView = null;
                }

                this.landingMobileView = new LandingMobileView();
                $('body').html(this.landingMobileView.render().$el);
            },

            openProjects: function () {
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
