const { watch, src, dest, parallel, series } = require('gulp')
const browserSync = require('browser-sync')
const del = require('del')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const pug = require('gulp-pug')
const imageMin = require('gulp-imagemin')
const ghPages = require('gulp-gh-pages')

function devServer(cb) {
  const params = {
    watch: true,
    reloadDebounce: 150,
    notify: true,
    server: { baseDir: './build'}
  }

  browserSync.create().init(params)
  cb()
}

function clearBuild() {
  return del('build/')
}

function buildPages() {
  return src('src/pages/*.pug')
        .pipe(pug())
        .pipe(dest('build/'))
}

function buildStyles() {
  return src('src/styles/style.scss', { allowEmpty: true })
        .pipe(sass())
        .pipe(postcss([
          autoprefixer(),
          cssnano()
        ]))
        .pipe(dest('build/styles/'))
}

function buildScripts() {
  return src('src/scripts/*.js')
        .pipe(dest('build/scripts/'))
}

function buildAssets() {
  return src('src/images/**/*.*')
        .pipe(imageMin())
        .pipe(dest('build/images/'))
}

function watchFiles() {
  watch('src/pages/*.pug', buildPages)
  watch('src/styles/*.scss', buildStyles)
  watch('src/scripts/*.js', buildScripts)
  watch('src/images/**/*.*', buildAssets)
}

function deploy() {
  return src('build/**/*')
        .pipe(ghPages())
}

exports.default = series(
  clearBuild,
  parallel(
    devServer,
    series(
      parallel(buildPages, buildStyles, buildScripts, buildAssets),
      watchFiles
    )
  )
)

exports.deploy = deploy