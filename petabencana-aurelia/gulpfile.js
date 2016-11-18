var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('images', function(){
  return gulp.src('src/assets/**/*.+(png|jpg|gif|svg)')
  .pipe(gulp.dest('dist'))
});

gulp.task('less', function(){
  return gulp.src('src/routes/cards/depth/depth.less')
  .pipe(less())
  .pipe(header("<!-- This file is generated — do not edit by hand! -->\n"))
  .pipe(gulp.dest('src/routes/cards/depth'))
});
