'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'toooms.github.io',
		dist: 'dist',

		concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['<%= app %>/js/*.js', 'src/project.js', 'src/outro.js'],
		      dest: '<%= app %>/built/app.js',
		    },
		  },

		sass: {
			options: {
				includePaths: ['<%= app %>/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				} , {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},
		
		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		cssmin: {
	        dist: {
	            files: {
	                '<%= dist %>/css/app.min.css': [
	                    '.tmp/css/{,*/}*.css',
	                    '<%= app %>/css/{,*/}*.css'
	                ]
	            }
	        },
	    },


		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		bowerInstall: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'font-awesome',
					'jquery-placeholder',
					'jquery.cookie',
					'foundation'
				]
			}
		}
		
	});

	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-bower-install');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['bowerInstall']);
	grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};