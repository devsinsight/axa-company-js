module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        plugins: ["@babel/plugin-transform-async-to-generator"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["**/*.js"],
          dest: "dist/",
          ext: ".js",
          extDot: 'last'
        },
        {
          expand: true,
          cwd: "test/",
          src: ["**/*.js"],
          dest: "dist_test/",
          ext: ".js",
          extDot: 'last'
        }]
      }
    },
    watch: {
      es6: {
        files: ["dist/**/*.js", "dist/**/*.yaml"],
        options: {
          module: "commonJS",
          target: "es2017",
          sourceMap: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          livereload: {
            host: "localhost",
            port: 3000
          }
        },  
      }
    },
    copy: {
      main: {
        expand: true,
        flatten: true,
        src: ["./src/**/*.yaml"],
        dest: "./dist/setup/"
      }
    },
    shell: {
      connect: {
        command:
          'SET NODE_ENV=development && concurrently --kill-others "nodemon ./dist | pino-pretty" "grunt watch"'
      }
    },
    open: {
      all: {
        path: "http://localhost:3000/docs/swagger",
        options: {
          delay: 4000
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask("default", [
    "babel:dist",
    "copy",
    "open",
    "shell:connect"
  ]);
};
