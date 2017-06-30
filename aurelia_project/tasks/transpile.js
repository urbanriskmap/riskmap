import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import project from '../aurelia.json';
import {CLIOptions, build} from 'aurelia-cli';

function configureEnvironment() {
  let env = CLIOptions.getEnvironment();

  return gulp.src(`aurelia_project/environments/${env}.js`)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(rename('environment.js'))
    .pipe(gulp.dest(project.paths.root));
}

// Use deployment specific config file
function configureDeployment() {
  let dep = CLIOptions.getFlagValue('dep', 'dep') ? CLIOptions.getFlagValue('dep', 'dep') : 'pb';

  return gulp.src(`aurelia_project/deployments/${dep}.js`)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(rename('deployment.js'))
    .pipe(gulp.dest(project.paths.root));
}

// Use deployment specific UI components
function fetchComponents() {
  let dep = CLIOptions.getFlagValue('dep', 'dep') ? CLIOptions.getFlagValue('dep', 'dep') : 'pb';

  return gulp.src([`deployment_specific/${dep}/components/**/*`])
    .pipe(changedInPlace({firstPass: true}))
    .pipe(gulp.dest('src/components/'));
}

function fetchAssets() {
  let dep = CLIOptions.getFlagValue('dep', 'dep') ? CLIOptions.getFlagValue('dep', 'dep') : 'pb';

  return gulp.src([`deployment_specific/${dep}/assets/**/*`])
    .pipe(changedInPlace({firstPass: true}))
    .pipe(gulp.dest('assets/'));
}

function fetchLocales() {
  let dep = CLIOptions.getFlagValue('dep', 'dep') ? CLIOptions.getFlagValue('dep', 'dep') : 'pb';

  return gulp.src([`deployment_specific/${dep}/locales/**/*`])
    .pipe(changedInPlace({firstPass: true}))
    .pipe(gulp.dest('src/resources/locales/'));
}

function buildJavaScript() {
  return gulp.src(project.transpiler.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sourcemaps.init())
    .pipe(babel(project.transpiler.options))
    .pipe(build.bundle());
}

export default gulp.series(
  configureEnvironment,
  configureDeployment,
  fetchComponents,
  fetchAssets,
  fetchLocales,
  buildJavaScript
);
