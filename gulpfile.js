var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var header = require('gulp-header');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var pkg = require('./package.json');

// Files
var files = ['./index.js', './src/*.js', './test/**/*.js'];
var banner = '/* lib.js - Version: ' + pkg.version + ' - Author: Markuplab (Kirill Kaysarov) */\n';

// Gremlins
gulp.task('gremlins', function() {
  return gulp.src(files[1])
    .pipe(replace(' ', ' '))
    .pipe(gulp.dest('./src'));
});

// Building
gulp.task('build', ['gremlins'], function() {
  return browserify({
    entries: './src/lib.js',
    standalone: 'lib',
    fullPaths: false
  })
  .transform(babelify.configure({
    loose: true
  }))
  .bundle()
  .pipe(source('lib.js'))
  .pipe(buffer())
  .pipe(header(banner))
  .pipe(gulp.dest('./build'))
  .pipe(rename('lib.min.js'))
  .pipe(uglify())
  .pipe(header(banner))
  .pipe(gulp.dest('./build'));
});

// Default
gulp.task('default', ['build']);
