'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var smoosher = require('gulp-smoosher');
var clean = require('gulp-rimraf');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var theme;

// Read config from jekyll config.
var yaml = require('js-yaml');
var fs = require('fs');
try {
  var doc = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
  theme = doc.theme;
} catch (e) {
  // Sorry, we have problems. Use default theme.
  theme = 'thrill';
}

var paths = {
  js: 'js/src/app.js',
  posts: ['js/posts.js']
};

gulp.task('scss', function() {
  return gulp.src('themes/' + theme + '/styles/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      error: function(err) {
      }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('themes/' + theme + '/styles/'));
});

var scriptTask = function(path, filename) {
  var debug = false;
  if (filename.indexOf('min.js') > 1) {
    debug = true;
  }
  var bundler = browserify(path, {debug: debug});
  if (debug) {
    debug = true;
    bundler.plugin('minifyify', {
      map: 'map.json', output: __dirname + '/map.json'
    });
  }
  return bundler
    .bundle()
    .pipe(source(filename))
    .pipe(gulp.dest('build/'));
};

gulp.task('scripts', function() {
  scriptTask(paths.js, 'app.js');
  // Minify and copy all JavaScript.
  return scriptTask(paths.js, 'app.min.js');
});

gulp.task('postscript', function() {
  // Minify and copy post.js
  return scriptTask(paths.posts, 'posts.min.js');
});

gulp.task('css', function() {
  // Concat all css

  return gulp.src('themes/' + theme + '/styles/*.css')
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('themes/' + theme + '/build/'));
});

gulp.task('inline', function() {
  return gulp.src('themes/' + theme+ '/templates/*.html')
    .pipe(smoosher())
    .pipe(gulp.dest('_layouts/'));
});

gulp.task('clean', function() {
  return gulp.src(['js/build', 'css/build'], {read: false})
    .pipe(clean());
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('themes/' + theme + '/styles/scss/main.scss', ['scss']);

});

gulp.task('default', ['clean', 'scss'], function() {
  gulp.start('css', 'scripts', 'postscript');
});
