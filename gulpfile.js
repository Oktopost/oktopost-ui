var gulp = require('gulp');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var camelcase = require('camelcase');
var handlebars = require('gulp-handlebars');
var sourcemaps = require('gulp-sourcemaps');


var files = {
    js: [
        'src/namespace.js', 
        'src/core/**/*',
        'src/views/**/*',
        'src/components/**/*'
    ],
    css: [
        'src/scss/**/*'
    ],
    views: [
        'src/templates/*'
    ]
};


function buildCss() {
    gulp.src(files.css)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('okto-ui.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
};

function buildJs() {
    gulp.src(files.js)
        .pipe(concat('okto-ui.js'))
        .pipe(gulp.dest('dist'));
};

function buildViews() {
    gulp.src(files.views)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Handlebars.templates',
            noRedeclare: true,
            processName: function (filePath) {
                return declare.processNameByPath(filePath.replace('src/templates/', ''));
            }
        }))
        .pipe(concat('okto-ui-templates.js'))
        .pipe(gulp.dest('dist')); 
};

gulp.task('buildCss', buildCss);
gulp.task('buildJs', buildJs);
gulp.task('buildViews', buildViews);

gulp.task('build', function () {
    buildViews();
    buildJs();
    buildCss();
});

gulp.task('watch', function() {
    gulp.watch(files.js, ['buildJs']);
    gulp.watch(files.views, ['buildViews']);
    gulp.watch(files.css, ['buildCss']);
});
