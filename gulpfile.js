'use strict';

var gulp = require('gulp');

gulp.task('styles', function () {
    var sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer'),
        sass = require('gulp-sass');
    return gulp.src(['./src/sass/main.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('./source-map', {
            addComment: true
        }))
        .pipe(gulp.dest('./styles'));
});

gulp.task('jst', [], function () {
    var template = require('gulp-template-compile'),
        concat = require('gulp-concat'),
        wrap = require('gulp-wrap-amd');
    return gulp.src('./src/templates/**/*.ejs')
        .pipe(template({
            name: function name(file) {
                var name = file.relative;
                name = name.replace('.ejs', '');
                name = name.replace(/[\\\/]/g, ':'); // Replace Unix & Windows path separator to ":"
                return name;
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(wrap({exports: 'JST'}))
        .pipe(gulp.dest('./scripts/'));
});

gulp.task('build', ['styles', 'jst']);

gulp.task('default', ['styles', 'jst']);
