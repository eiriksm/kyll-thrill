var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var smoosher = require('gulp-smoosher');
var clean = require('gulp-clean');

var paths = {
  js: ['js/lib/*.js', 'js/src/*.js'],
  css: ['styles/*.css']
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript.
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
  // Concat all css

  return gulp.src(paths.css)
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/'));
});

gulp.task('inline', function() {
  return gulp.src('_layout_templates/*.html')
    .pipe(smoosher())
    .pipe(gulp.dest('_layouts/'));
});

gulp.task('clean', function() {
  return gulp.src(['js/build', 'css/build'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('css', 'scripts');
});
