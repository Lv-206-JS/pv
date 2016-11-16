// Karma configuration
// Generated on Mon Sep 08 2014 19:31:01 GMT+0300 (EEST)

module.exports = function exports(config) {
    config.set({
        browserNoActivityTimeout: 60000,
        //http://localhost:9090/

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'test/*.js'},
            {pattern: 'test/**/*Spec.js'}
        ],

        // list of files to exclude
        exclude: [],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        preprocessors: {
            'src/**/*.js': ['coverage'],
            'test/*.html': ['html2js']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage' /*, 'junit' */],

        junitReporter: {
            outputFile: './junit/unit.xml',
            suite: 'unit'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        //browsers: ['Firefox'],
        //browsers: ['Opera'],
        //browsers: ['Safari'],
        //browsers: ['Opera', 'Chrome', 'Firefox', 'Safari'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
