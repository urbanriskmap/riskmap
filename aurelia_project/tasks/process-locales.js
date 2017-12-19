import gulp from 'gulp';
import file from 'gulp-file';
import * as deployments from '../deployments/deployments';
import * as locales from '../deployments/locales';
import {CLIOptions} from 'aurelia-cli';

export default function processLocales() {
  let dep = CLIOptions.getFlagValue('dep', 'dep');
  let languages = {};

  for (let lang of deployments[dep].supported_languages) {
    languages[lang.key] = locales[dep][lang.key];
  }

  let str = 'export class Locales {constructor() {this.languages = ' + JSON.stringify(languages) + ';}}';

  return gulp.src('src/resources/locales/*', {read: false})
  .pipe(file('locales.js', str))
  .pipe(gulp.dest('src/resources/locales'));
}
