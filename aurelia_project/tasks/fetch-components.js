import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import {CLIOptions} from 'aurelia-cli';

export default function fetchComponents() {
  let dep = CLIOptions.getFlagValue('dep', 'dep');

  return gulp.src([`deployment_specific/${dep}/ds_components/**/*`])
    .pipe(changedInPlace({firstPass: true}))
    .pipe(gulp.dest('src/components/'));
}
