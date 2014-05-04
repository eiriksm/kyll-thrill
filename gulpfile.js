var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var smoosher = require('gulp-smoosher');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var theme;

// Read config from jekyll config.
var yaml = require('js-yaml');
var fs = require('fs');
try {
  var doc = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
  var theme = doc.theme;
} catch (e) {
  // Sorry, we have problems. Use default theme.
  theme = 'thrill';
}

var paths = {
  js: ['js/lib/*.js', 'js/src/*.js'],
  posts: ['js/posts.js']
};

gulp.task('scss', function() {
  return gulp.src('themes/' + theme + '/styles/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      error: function(err) {
      }
    }))
    .pipe(gulp.dest('themes/' + theme + '/styles/'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript.
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('postscript', function() {
  // Minify and copy post.js
  return gulp.src(paths.posts)
    .pipe(uglify())
    .pipe(concat('posts.min.js'))
    .pipe(gulp.dest('build/'));
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

gulp.task('default', ['clean', 'scss'], function() {
  gulp.start('css', 'scripts', 'postscript');
});
