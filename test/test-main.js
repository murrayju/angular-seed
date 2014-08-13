/*jslint browser: true, nomen: true */
(function (requirejs) {
    'use strict';

    var allTestFiles = [],
        pathToModule = function (path) {
            return path.replace(/^\/base\//, '../../').replace(/\.js$/, '');
        };

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (/^\/base\/test\/.*(spec|test)\.js$/i.test(file) || /^\/base\/test\/helpers\/.*\.js$/i.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });

    requirejs.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: '/base/src/js',
        waitSeconds: 0,

        paths: {
            'app.templates': "/base/test/app.templates",
            jquery: "/base/bower_components/jquery/dist/jquery.min",
            'jquery.bootstrap': "/base/bower_components/bootstrap/dist/js/bootstrap",
            angular: "/base/bower_components/angular/angular.min",
            'angular-mocks': "/base/bower_components/angular-mocks/angular-mocks",
            'angular-animate': "/base/bower_components/angular-animate/angular-animate.min",
            'angular-sanitize': "/base/bower_components/angular-sanitize/angular-sanitize.min",
            'angular-resource': "/base/bower_components/angular-resource/angular-resource.min",
            'angular-ui-router': "/base/bower_components/angular-ui-router/release/angular-ui-router.min",
            'angular-strap': "/base/bower_components/angular-strap/dist/angular-strap.min",
            'angular-strap-tpl': "/base/bower_components/angular-strap/dist/angular-strap.tpl.min",
            fastclick: "/base/bower_components/fastclick/lib/fastclick",
            moment: "/base/bower_components/moment/min/moment.min",
            underscore: "/base/bower_components/underscore/underscore",
            css: "/base/bower_components/require-css/css.min"
        },

        shim: {
            angular: {
                deps: ['jquery'],
                exports: 'angular'
            },
            'angular-animate': ['angular'],
            'angular-sanitize': ['angular'],
            'angular-resource': ['angular'],
            'angular-mocks': {
                deps: ['angular'],
                exports: 'angular.mock'
            },
            'angular-strap': ['angular', 'angular-animate'],
            'angular-strap-tpl': ['angular', 'angular-animate', 'angular-strap'],
            'angular-ui-router': ['angular'],
            'jquery.bootstrap': ['jquery']
        },

        // dynamically load all test files
        deps: allTestFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });
}(window.requirejs));
