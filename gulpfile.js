var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('process-styles', function() {
    return gulp.src('css/main.scss')
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest('css/'))
});