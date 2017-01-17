requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery',
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        'backbone-validation': '/node_modules/backbone-validation/dist/backbone-validation',
        userModel: '/src/scripts/models/User',
        projectsCollection: '/src/scripts/collections/Projects',
        Snap: '/bower_components/Snap.svg/dist/snap.svg',
        JST: '/scripts/templates',
        Draggabilly: '/bower_components/draggabilly/dist/draggabilly.pkgd',
        timeLine: '/src/scripts/math/timeLine',
        moment: '/node_modules/moment/moment',
        TaskAlgorithm: '/src/scripts/math/taskAlgorithm',
        undoRedoAlgorithm: '/src/scripts/math/undoRedoAlgorithm',
        bowser : '/bower_components/bowser/src/bowser'
    },
    baseUrl: '/src/scripts'
});

requirejs(['jquery', 'backbone', 'userModel', 'projectsCollection', 'Router', 'MobileRouter', 'bowser'], function ($, Backbone, UserModel, ProjectsCollection, DesktopRouter, MobileRouter, Bowser) {
    'use strict';
    
    $(function () {
        //
        // Global namespace PV == Plan & View
        //
        window.PV = window.PV || {};



        if (Bowser.mobile) {
            PV.userModel = new UserModel();
            PV.router = new MobileRouter();
        } else {
            PV.userModel = new UserModel();
            PV.projectsCollection = new ProjectsCollection();
            PV.router = new DesktopRouter();

        }

        Backbone.history.start({
            pushState: true
        });
    });
});

