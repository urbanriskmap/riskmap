import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export default function processLESS() {
  return gulp.src(project.lessProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(build.bundle());
}
