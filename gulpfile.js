var gulp = require('gulp');

gulp.task('hello', function () {
  console.log("Hello, ");
});

gulp.task('world', function () {
  console.log("world!");
});

gulp.task('default', ['world', 'hello']);

