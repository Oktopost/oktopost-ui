const gulp = require('gulp');
const sass = require('gulp-sass');
const wrap = require('gulp-wrap');
const concat = require('gulp-concat');
const declare = require('gulp-declare');
const camelcase = require('camelcase');
const handlebars = require('gulp-handlebars');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');


var result = require('oktopost-namespace').getDependencies(
	__dirname,
	() => {},
	(root) =>
	{
		var a = root.OUI.includes;
	});

const files = {
	
	css: [
		'src/scss/**/*'
	],
	views: [
		'src/templates/*'
	],
	namespace: [
		'node_modules/oktopost-namespace/src/Namespace.js'
	],
	js: [
		'build/tmp/namespace.js',
		...result
	]
};


function buildNamespace()
{
	gulp.src(files.namespace)
		.pipe(sourcemaps.init())
		.pipe(wrap({src: 'build/templates/namespace.wrap.js.template'}))
		.pipe(sourcemaps.write())
		.pipe(rename('namespace.js'))
		.pipe(gulp.dest('build/tmp'));
}


function buildCss()
{
	gulp.src(files.css)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('okto-ui.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
}

function buildJs()
{
	gulp.src(files.js)
		.pipe(concat('okto-ui.js'))
		.pipe(gulp.dest('dist'));
}

function buildViews()
{
	gulp.src(files.views)
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'OUI.templates',
			noRedeclare: true,
			processName: function (filePath) {
				return declare.processNameByPath(filePath.replace('src/templates/', ''));
			}
		}))
		.pipe(concat('okto-ui-templates.js'))
		.pipe(gulp.dest('dist')); 
}


gulp.task('build-css', buildCss);
gulp.task('build-views', buildViews);

gulp.task('build-namespace', buildNamespace);
gulp.task('build-js', ['build-namespace'], buildJs);


gulp.task(
	'build', 
	[
		'build-css',
		'build-views',
		'build-js'
	]
);


gulp.task('watch', function() 
{
	gulp.watch(files.js, ['build-js']);
	gulp.watch(files.views, ['build-views']);
	gulp.watch(files.css, ['build-css']);
	gulp.watch(files.namespace, ['build-namespace']);
});
