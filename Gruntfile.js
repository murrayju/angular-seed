/*jslint node:true */
module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    var saveFileWithHeader = function (path, text, banner) {
        grunt.file.write(path, grunt.template.process(banner) + text);
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> murrayju | built on <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        // Dependency management and minification
        requirejs: {
            app: {
                options: {
                    name: "almond",
                    optimize: 'none',
                    optimizeCss: "standard",
                    inlineText: true,
                    include: ['bootstrap'],
                    stubModules: ['css'],
                    preserveLicenseComments: false,
                    baseUrl: "src/js/",
                    siteRoot: "src/",
                    mainConfigFile: "src/js/bootstrap.js",
                    paths: {
                        'css-builder': "../../bower_components/require-css/css-builder",
                        'less-builder': "../../bower_components/require-less/less-builder",
                        almond: "../../bower_components/almond/almond",
                        'app.templates': 'empty:'
                    },
                    exclude: ['normalize'],
                    out: function (text) {
                        saveFileWithHeader("dist/app.js", text, "<%= banner %>");
                    }
                }
            }
        },

        // inline angular templates
        ngtemplates: {
            app: {
                src: 'template/**.html',
                cwd: 'src',
                dest: 'dist/app.js',
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        removeComments: true
                    },
                    bootstrap: function (module, script) {
                        return "define('app.templates', [], function() { return ['$templateCache', function ($templateCache) {" + script + "}]; });";
                    },
                    append: true
                }
            }
        },

        uglify: {
            options: {
                preserveComments: false,
                report: "gzip",
                banner: "<%= banner %>"
            },
            app: {
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },

        processhtml: {
            app: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },

        // JSLint style enforcer
        jslint: {
            app: {
                src: ['src/js/*.js'],
                directives: {
                    browser: true,
                    vars: true,
                    regexp: true,
                    unparam: true,
                    predef: ['define', 'require', 'requirejs']
                },
                options: {
                    junit: 'reports/jslint-app.xml'
                }
            }
        },

        // Karma test runner
        karma: {
            app: {
                options: {

                    // base path that will be used to resolve all patterns (eg. files, exclude)
                    basePath: '',

                    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
                    frameworks: ['jasmine', 'requirejs'],

                    // list of files / patterns to load in the browser
                    files: [
                        'test/test-main.js',
                        {
                            pattern: 'src/js/**/*',
                            included: false
                        },
                        {
                            pattern: 'src/less/**/*',
                            included: false
                        },
                        {
                            pattern: 'bower_components/**/*',
                            included: false
                        },
                        {
                            pattern: 'test/**/*Spec.js',
                            included: false
                        }
                    ],

                    exclude: ['src/js/bootstrap.js'],

                    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
                    reporters: ['dots', 'junit'],
                    junitReporter: {
                        outputFile: 'reports/karma-results.xml'
                    },

                    // web server port
                    port: 9876,

                    // enable / disable colors in the output (reporters and logs)
                    colors: true,

                    logLevel: 'INFO',

                    // enable / disable watching file and executing tests whenever any file changes
                    autoWatch: false,

                    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                    browsers: [
                        'Chrome',
                        'Firefox',
                        'PhantomJS'
                    ],

                    // Continuous Integration mode
                    // if true, Karma captures browsers, runs the tests and exits
                    singleRun: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('test', ['jslint', 'karma']);
    grunt.registerTask('build', ['requirejs', 'ngtemplates', 'uglify', 'processhtml']);
    grunt.registerTask('default', ['test', 'build']);
};
