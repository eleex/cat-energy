const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const embedSvg = require('gulp-embed-svg');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function clear () {
    return del('./build/*');
}

function styles () {
    return gulp.src('./src/sass/main-page.scss')
                .pipe(plumber())
                .pipe(sass({
                    includePaths: require('node-normalize-scss').includePaths
                }).on('error', sass.logError))
                .pipe(sourcemaps.init())
                .pipe(autoprefixer({
                    overrideBrowserslist: ['> 0.1%'],
                    cascade: false
                }))
                // .pipe(gcmq())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./build/css'))
                .pipe(browserSync.stream());
}

function img () {
    return gulp.src('./src/img/**/*')
                .pipe(gulp.dest('./build/img'));
}

function html () {
    return gulp.src('./src/*.html')
                .pipe(embedSvg({
                    root: './build/'
                  }))
                .pipe(gulp.dest('./build/'))
                .pipe(browserSync.stream());
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch('./src/sass/**/*.scss', styles);
    gulp.watch('./src/*.html', html);
}

let build = gulp.series(clear, gulp.parallel(styles, img), html, watch);

gulp.task('build', build);