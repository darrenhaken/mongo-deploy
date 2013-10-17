/*
 * grunt-mongo-deploy
 * https://github.com/darren.haken/mongo-deploy
 *
 * Copyright (c) 2013 darren.haken
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('mongo_deploy', 'Deploys Mongo JavaScript to a Mongo database', function () {
        var options = this.options();

        // Merge task-specific and/or target-specific options with these defaults.
        //grunt.verbose.writeln('Using Options: ' + JSON.stringify(options, null, 4).cyan);

        //TODO DH Sort the files by date
        //TODO DH Then enumerate through files and execute

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    // Read file source.
                    return grunt.file.read(filepath);
                }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
};
