const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sass = gulpSass(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  scss: 'src/scss/**/*.scss',
  html: 'src/**/*.html',
  dist: 'dist',
  cssDist: 'dist/css'
};

function stylesDev() {
  return src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.cssDist))
    .pipe(browserSync.stream());
}

function stylesBuild() {
  return src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.cssDist));
}

function htmlAndJs() {
  return src(['src/**/*.html', 'src/**/*.js'])
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: { baseDir: paths.dist },
    notify: false,
    open: true
  });

  watch(paths.scss, stylesDev);
  watch(['src/**/*.html', 'src/**/*.js'], htmlAndJs);
}

exports.default = series(parallel(htmlAndJs, stylesDev), serve);
exports.build = series(parallel(htmlAndJs, stylesBuild));
