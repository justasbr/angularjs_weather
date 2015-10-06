var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var htmlreplace = require('gulp-html-replace');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('html-replace', function() {
  gulp.src('app/index.html')
    .pipe(htmlreplace({
        'css': 'index.css',
        'js': 'all.js'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('app/*.js', ['lint', 'scripts']);
    gulp.watch('app/*.scss', ['sass']);
    gulp.watch('app/*.html', ['html-replace']);
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9876
  });
});



gulp.task('default', ['lint', 'clean', 'copy-bower-components',
  'sass', 'scripts', 'html-replace', 'watch', 'connectDist']);