import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import {CLIOptions} from 'aurelia-cli';

let replace = require('gulp-replace');

export default function processServerKey() {
  let env = CLIOptions.getFlagValue('env', 'dev');
  let serverKey = CLIOptions.getFlagValue('data_server_key', '{data_server_key}');
  if (!serverKey) serverKey = '{data_server_key}';
  return gulp.src(`aurelia_project/environments/${env}.js`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(replace('{data_server_key}', serverKey))
    .pipe(gulp.dest('aurelia_project/environments/'));
}
