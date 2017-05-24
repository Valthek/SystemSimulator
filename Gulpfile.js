// Run this by running 'gulp' in cmd

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('styling/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styling/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('styling/**/*.scss',['styles']);
});