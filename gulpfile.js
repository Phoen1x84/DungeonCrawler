const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


gulp.task('scripts', function() {
  return gulp.src([
    './scripts/constructors/*.js',
    './scripts/generators/*.js',
    './scripts/app.js'
    ])
    .pipe(concat({
      path: 'app.build.js'
    }))
    .pipe(gulp.dest('./dist/scripts/'))
});

gulp.task('browserReload', ['scripts'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scripts/*.js', ['browserReload']);
  gulp.watch('./*.html', ['browserReload']);
});


gulp.task('default', ['watch']);
gulp.task('build', ['scripts']);
