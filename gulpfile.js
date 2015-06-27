var gulp = require('gulp');

gulp.task('scripts', function () {
	gulp.src('./client/app/**/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
	gulp.src('./client/assets/**/*.css').pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
	gulp.src('./client/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html', 'scripts', 'styles']);

