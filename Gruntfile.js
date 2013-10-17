/*
 * grunt-mongo-deploy
 * https://github.com/darrenhaken/mongo-deploy
 *
 * Copyright (c) 2013 Darren Haken
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        shell: {
            mongo: {
                command: 'mongod'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        mongo_deploy: {
            default_options: {
                options: {
                    mongoConnection: 'locahost'
                },
                files: {
                    src: ['mongo-scripts/*.js']
                }
            }
//            custom_options: {
//                options: {
//                    separator: ': ',
//                    punctuation: ' !!!'
//                },
//                files: {
//                    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
//                }
//            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'mongo_deploy', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);


};
