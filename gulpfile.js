import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import del from 'del';
import csso from 'postcss-csso';
import squoosh from 'gulp-libsquoosh';
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";

const BUILD_FOLDER = 'build';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// del build folder
const delfolder = () => {
  return del(BUILD_FOLDER);
}

// copying files
export const copyfiles = (done) => {
  return gulp.src(
    [
      "source/fonts/*.{woff,woff2}",
      "source/*.ico",
      "source/manifest.webmanifest",
    ],
    {
      base: "source"
    }
  )
  .pipe(gulp.dest(BUILD_FOLDER))
  done();
}

// sprite
export const sprite = () => {
  return gulp.src('source/img/icons-for-sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(BUILD_FOLDER+'/img/'));
}

// minify SVG
export const minifySvg = () => {
  return gulp.src(['source/img/*.svg', '!source/img/sprite.svg'])
  .pipe(svgo())
  .pipe(gulp.dest(BUILD_FOLDER+'/img/'));
}

// minify Styles
const productStyles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(BUILD_FOLDER+'/css', { sourcemaps: '.' }));
}

// images optimization
export const imagesOptimization = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest(BUILD_FOLDER+'/img/'));
}

// Webp optimization
export const webp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {},
  }))
  .pipe(gulp.dest(BUILD_FOLDER+'/img/'));
}

// html minify
const htmlMin = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(BUILD_FOLDER))
}

// js minify
const jsMin = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest(BUILD_FOLDER+'/js/'))
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const productServer = (done) => {
  browser.init({
    server: {
      baseDir: BUILD_FOLDER
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

export const production = gulp.series(
  delfolder,
  copyfiles,
  productStyles,
  gulp.parallel(
    sprite,
    minifySvg,
    imagesOptimization,
    webp,
    jsMin,
    htmlMin
  )
);

export const start = gulp.series(
  production,
  productServer
);

export const devStart = gulp.series(
  styles, server, watcher
);

export default gulp.series(
  styles, server, watcher
);
