var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

var browserSync = require('browser-sync').create(); 

// Browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream'); 

var paths = {
	dist    : './dist',
	scripts : './client/app/**/*.js',
	styles  : './client/assets/styles/**/*.less',
	html    : './client/**/*.html',
	images  : ['./client/assets/favicon.ico', './client/assets/images/**/*.*']
};

/*
 * Cleans the dist directory
 */
gulp.task('clean:styles', function (cb) {
  del(paths.dist + '/css', cb);
});

gulp.task('clean:images', function (cb) {
  del(paths.dist + '/images', cb);
});

gulp.task('clean:html', function (cb) {
  del(paths.dist + '/**/*.html', cb);
});

/*
 * Checks the validity of JS code
 */
gulp.task('lint', function () {
	return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
 * Compiles CJS modules into an all-in-one bundle
 */
gulp.task('browserify', function() {
    return browserify('./client/app/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

/*
 * Compiles less files into css
 */
gulp.task('styles', ['clean:styles'], function () {
	return gulp.src(paths.styles)
		.pipe(less())
		.pipe(gulp.dest(paths.dist + '/css'))
        .pipe(browserSync.stream());
});

/*
 * Copies html files to dist directory
 */
gulp.task('html', ['clean:html'], function () {
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.dist));
});

/*
 * Copies images files to dist directory
 */
gulp.task('images', ['clean:images'], function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.dist + '/img'));
});

/*
 * Macro task to re-build the whole dist directory
 */
gulp.task('build', [
	'lint',
    'browserify',
	'html', 
	'images',
	'styles'
]);

/*
 * Synchronizes the browser with the 'dist' directory
 */
gulp.task('serve', ['build'], function () {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
    
    gulp.watch(paths.scripts, ['lint', 'browserify']).on("change", browserSync.reload);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.html, ['html']).on("change", browserSync.reload);
    gulp.watch(paths.images, ['images']).on("change", browserSync.reload);

});

/*
 * Default task, builds everything and watches for changes
 */
gulp.task('default', ['serve']);
