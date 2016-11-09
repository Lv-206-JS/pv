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
        .pipe(sourcemaps.write('./styles', {
            addComment: true
        }))
        .pipe(gulp.dest('./styles'));
});

gulp.task('default', ['styles'], function () {
    var livereload = require('gulp-livereload'),
        open = require('gulp-open'),
        options = {
            uri: 'http://localhost:9090'
        };

    livereload.listen({
        start: true,
        port: 35729
    });

    gulp.watch('./src/sass/**/*.scss', ['styles']);
    gulp.watch(['./styles/main.css', './scripts/*.js']).on('change', livereload.changed);

    gulp.src('./index.html').pipe(open(options));
});