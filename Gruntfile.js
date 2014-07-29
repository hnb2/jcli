module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['js/src'],
                    outdir: 'build/doc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('docs', ['yuidoc']);
};
