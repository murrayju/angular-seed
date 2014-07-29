/*jslint browser:true */
/*global requirejs */

// define the dependencies with requirejs
requirejs.config({
    // baseUrl is implicitly relative to this file
    waitSeconds: 0,

    paths: {
        jquery: "../../bower_components/jquery/dist/jquery",
        'jquery.bootstrap': "../../bower_components/bootstrap/dist/js/bootstrap",
        angular: "../../bower_components/angular/angular",
        'angular-animate': "../../bower_components/angular-animate/angular-animate",
        'angular-sanitize': "../../bower_components/angular-sanitize/angular-sanitize",
        'angular-resource': "../../bower_components/angular-resource/angular-resource",
        'angular-ui-router': "../../bower_components/angular-ui-router/release/angular-ui-router",
        'angular-strap': "../../bower_components/angular-strap/dist/angular-strap",
        'angular-strap-tpl': "../../bower_components/angular-strap/dist/angular-strap.tpl",
        fastclick: "../../bower_components/fastclick/lib/fastclick",
        moment: "../../bower_components/moment/min/moment",
        underscore: "../../bower_components/underscore/underscore",
        css: "../../bower_components/require-css/css",
        less: "../../bower_components/require-less/less",
        lessc: "../../bower_components/require-less/lessc",
        normalize: "../../bower_components/require-less/normalize"
    },

    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-animate': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-strap': ['angular', 'angular-animate'],
        'angular-strap-tpl': ['angular', 'angular-animate', 'angular-strap'],
        'angular-ui-router': ['angular'],
        'jquery.bootstrap': ['jquery']
    },

    less: {
        relativeUrls: true
    }
});

// This is the main application entry point, invoked by requirejs
// bootstraps the angularjs app with the dom
requirejs([
    'angular',
    'app',
    'fastclick',
    'less!../less/main'
],
    function (angular, app, fastclick) {
        'use strict';

        angular.element().ready(function () {
            angular.bootstrap(document, [app.name]);
            fastclick.attach(document.body);
        });
    });
