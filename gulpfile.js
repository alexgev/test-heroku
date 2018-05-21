var gulp = require('gulp');
gulp.task('copy', function () {
  gulp.src('./assets/**/*')
    .pipe(gulp.dest('.tmp/public'));
  gulp.src([
    'client/**/*',
    '!client/app',
    '!client/app*/**'
  ]).pipe(gulp.dest('.tmp/public'));
});
