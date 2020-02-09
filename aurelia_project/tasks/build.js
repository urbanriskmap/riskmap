import gulp from 'gulp';
import fetchComponents from './fetch-components';
import processLocales from './process-locales';
import transpile from './transpile';
import processMarkup from './process-markup';
import processServerKey from './process-server-key';
import processLESS from './process-less';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  fetchComponents,
  processLocales,
  processServerKey,
  gulp.parallel(
    transpile,
    processMarkup,
    processLESS,
    processCSS
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
