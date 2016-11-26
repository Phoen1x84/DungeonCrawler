let gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('scripts', function(){
  return gulp.src('./scripts/*.js')
  .pipe(gulp.dest('./scripts/'))
});

gulp.task('browserReload', ['scripts'], function(done){
  browserSync.reload();
  done();
});

gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scripts/*.js', ['browserReload']);
  gulp.watch('./*.html', ['browserReload']);
});


gulp.task('default', ['watch']);
