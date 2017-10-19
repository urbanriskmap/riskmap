import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback/lib';
import project from '../aurelia.json';
import build from './build';
import {CLIOptions} from 'aurelia-cli';

function log(message) {
  console.log(message); //eslint-disable-line no-console
}

function onChange(path) {
  log(`File Changed: ${path}`);
}

function reload(done) {
  browserSync.reload();
  done();
}

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      logLevel: 'silent',
      server: {
        baseDir: ['.'],
        middleware: [historyApiFallback(), function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
      }
    }, function(err, bs) {
      let urls = bs.options.get('urls').toJS();
      log(`Application Available At: ${urls.local}`);
      log(`BrowserSync Available At: ${urls.ui}`);
      if (project.mockapi){
        //start the mocking server
        var canned = require('canned');
        var http = require('http');
        var opts = { logger: process.stdout, cors: true };
        console.log(__dirname);
        var mockApiPath = __dirname+'/../../mockapi/.';
        var mockApiPort = 3000;
        log('Serving mock api from '  +  mockApiPath + ' at localhost:' + mockApiPort);

        var can = canned(mockApiPath, opts);

        http.createServer(can).listen(mockApiPort);
      }
      done();
    });
  }
);

let refresh = gulp.series(
  build,
  reload
);

let watch = function() {
  gulp.watch(project.transpiler.sourceWatch, refresh).on('change', onChange);
  gulp.watch(project.markupProcessor.sourceWatch, refresh).on('change', onChange);
  gulp.watch(project.lessProcessor.sourceWatch, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.source, refresh).on('change', onChange);
  gulp.watch('deployment_specific/**/*.*', refresh).on('change', onChange);
};

let run;

if (CLIOptions.hasFlag('watch')) {
  run = gulp.series(
    serve,
    watch
  );
} else {
  run = serve;
}

export default run;
