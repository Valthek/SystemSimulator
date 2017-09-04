// Run this by running 'gulp' in cmd

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('styling/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styling/', {overwrite: true}));
});

//Watch task
gulp.task('default',['styles'],function() {
    gulp.watch('styling/**/*.scss',['styles']);
});