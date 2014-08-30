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
                    out: 'build/jcli.min.js'
                }
            }
        },
        copy: {
            main: {
                src: 'build/jcli.min.js',
                dest: 'demo/lib/jcli.min.js'
            }
        },
        karma: {
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    /**
     * Generate the documentation using YuiDoc
     */
    grunt.registerTask('docs', ['yuidoc']);

    /**
     * Build the project jcli.js into build/
     * and copy it into demo/
     */
    grunt.registerTask('build', ['requirejs', 'copy']);

    /**
     * Run the unit tests 
     */
    grunt.registerTask('test', ['karma']);
};
