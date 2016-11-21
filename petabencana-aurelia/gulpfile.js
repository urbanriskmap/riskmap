var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(){
  return gulp.src('src/routes/cards/depth/depth.less')
  .pipe(less())
  .pipe(gulp.dest('src/routes/cards/depth'))
});
