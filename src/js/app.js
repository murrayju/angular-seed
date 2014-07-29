/*jslint browser:true */
/*global define */

// Create the main application module
define(['angular', 'app.config', 'app.svc', 'app.ctrl', 'app.templates', 'angular-ui-router', 'jquery.bootstrap'], function (angular, appConfig, appSvc, appCtrl, appTemplates) {
    'use strict';

    return angular.module('MainAppModule', ['ui.router'])
        .config(appConfig)
        .factory(appSvc)
        .controller(appCtrl)
        .run(appTemplates);
});
