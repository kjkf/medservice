var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

function sassTOcss(done){
  gulp.src('./sass/bota.sass')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename('bota.css')) //pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./css/'));

  done();
}

function sassTOcssGEN(done){
  gulp.src('./sass/style.sass')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename('style.css')) //pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./css/'));

  done();
}
gulp.task(sassTOcss);
gulp.task(sassTOcssGEN);
