var gulp = require('gulp');
var karma = require('karma').server;
var $ = require('gulp-load-plugins')();
var del = require('del');

var log = $.util.log

var paths = {
  js: './toast.js',
  css: './toast.css',
  report: './report',
  build: './build'
};

gulp.task('default', $.taskListing);

gulp.task('analyze', function() {
  log('Analyzing and Running source with JSHint');

  return gulp
    .src([paths.js])
    .pipe($.jshint('./.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('js', function() {
  log('Bundling, minifying, and copying the app\'s JavaScript');

  return gulp
    .src(paths.js)
    .pipe($.sourcemaps.init())
    .pipe($.bytediff.start())
    .pipe($.uglify())
    .pipe($.bytediff.stop(bytediffFormatter))
    .pipe($.sourcemaps.write('.'))
    .pipe($.rename(function(path) {
      if (path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('css', function() {
  log('Bundling, minifying, and copying the app\'s CSS');

  return gulp
    .src(paths.css)
    .pipe($.bytediff.start())
    .pipe($.minifyCss({}))
    .pipe($.bytediff.stop(bytediffFormatter))
    .pipe($.rename('toast.min.css'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build', ['js', 'css'], function() {
  log('Analyze, Build CSS and JS');
});

gulp.task('clean', function(cb) {
  log('Cleaning: ' + $.util.colors.blue(paths.report));
  log('Cleaning: ' + $.util.colors.blue(paths.build));

  del([paths.build, paths.report], cb);
});

gulp.task('test', function(done) {
  startTests(true, done);
});


////////////////

function startTests(singleRun, done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !!singleRun
  }, karmaCompleted);

    ////////////////

    function karmaCompleted() {
        done();
    }
}

function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';

  return data.fileName + ' went from ' +
      (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
      ' and is ' + ((1 - data.percent) * 100).toFixed(2) + '%' + difference;
}