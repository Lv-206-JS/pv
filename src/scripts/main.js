requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery',
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        Snap: '/bower_components/Snap.svg/dist/snap.svg',
        JST: '/scripts/templates',
        Draggabilly: '/bower_components/draggabilly/dist/draggabilly.pkgd',
        timeLine: '/src/scripts/math/timeLine',
        moment: '/node_modules/moment/moment',
        TaskAlgorithm: '/src/scripts/algorithms/taskAlgorithm'
    },
    baseUrl: '/src/scripts'
});

requirejs(['jquery', 'backbone', 'Router'], function ($, Backbone, Router) {
    'use strict';
    
    $(function () {
        //
        // Global namespace PV == Plan & View
        //
        window.PV = window.PV || {};
        PV.router = new Router();

        Backbone.history.start({
            pushState: true
        });
    });
});
