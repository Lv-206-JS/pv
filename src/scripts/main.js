requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery',
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        Snap: '/bower_components/Snap.svg/dist/snap.svg',
        JST: '/scripts/templates'
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


// System.import('backbone').then(function (Backbone) {
//     'use strict';
//
//     var MainRouter = Backbone.Router.extend({});
//
//     $(function () {
//         //
//         // Global namespace PV == Plan & View
//         //
//         window.PV = window.PV || {};
//         PV.router = new MainRouter();
//
//         Backbone.history.start({
//             pushState: true
//         });
//     });
// });


// window.addEventListener('load', function () {
//     'use strict';
//
//     var button = document.getElementById('hello-button');
//
//     button.addEventListener('click', function () {
//         var xhr = new XMLHttpRequest();
//
//         function fail() {
//             window.alert('Oops!!');
//         }
//
//         function success() {
//             var response = JSON.parse(xhr.responseText);
//             console.log(response);
//
//             window.alert(xhr.responseText);
//         }
//
//         xhr.open('GET', '/rest/hello', true);
//         xhr.addEventListener('error', fail);
//         xhr.addEventListener('load', success);
//         xhr.send();
//     });
// });
