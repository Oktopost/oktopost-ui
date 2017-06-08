var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('buildCss', function () {
    gulp.src(['src/scss/**/*'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('okto-ui.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('buildJs', function () {
    gulp.src(['src/namespace.js', 'src/views/**/*', 'src/components/**/*'])
        .pipe(concat('okto-ui.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
    gulp.watch(['src/components/**/*', 'src/views/**/*'], ['buildJs']);
    gulp.watch(['src/scss/**/*'], ['buildCss']);
});
