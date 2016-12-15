import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processLESS from './process-less';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';
import prepareFontAwesome from './prepare-font-awesome'; // for font awasom icons

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processLESS,
    processCSS,
    prepareFontAwesome
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
