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
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js/src',
                    paths: {
                        lib: '../lib'
                    },
                    name: 'jcli',
                    out: 'build/jcli.js'
                }
            }
        },
        copy: {
            main: {
                src: 'build/jcli.js',
                dest: 'demo/jcli.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /**
     * Generate the documentation using YuiDoc
     */
    grunt.registerTask('docs', ['yuidoc']);

    /**
     * Build the project jcli.js into build/
     * and copy it into demo/
     */
    grunt.registerTask('build', ['requirejs', 'copy']);
};
