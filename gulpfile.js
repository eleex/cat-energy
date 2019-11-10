const gulp = require('gulp');
const del = require('del');
const rename = require("gulp-rename");
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function clear () {
    return del('./build/*');
}

function style () {
    return gulp.src('./src/sass/*-page.scss')
                .pipe(sourcemaps.init())
                .pipe(plumber())
                .pipe(sass({
                    includePaths: require('node-normalize-scss').includePaths
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                    overrideBrowserslist: ['> 0.1%'],
                    cascade: false
                }))
                // .pipe(gcmq())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./build/css'))
                .pipe(cleanCSS({
                    level: 2
                }))
                .pipe(rename(function (path) {
                    path.basename += ".min";
                    path.extname = ".css";
                  }))
                .pipe(gulp.dest('./build/css'))
                .pipe(browserSync.stream());
}

function html () {
    return gulp.src('./src/*.html')
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest('./build'))
                .pipe(browserSync.stream());
}

function svgSprite () {
    return gulp.src('./src/img/sprite/icon-*.svg')
                .pipe(svgstore({ inlineSvg: true }))
                .pipe(rename('sprite.svg'))
                .pipe(gulp.dest('./build/img'));
}

function imgMin () {
    return gulp.src([
                    './src/img/**/*.{png,jpg,svg}',
                    '!./src/img/{sprite,sprite/**}'
                ])
                .pipe(imagemin([
                    imagemin.jpegtran({progressive: true}),
                    imagemin.optipng({optimizationLevel: 3}),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ]))
                .pipe(gulp.dest('./build/img/'));
}

function fonts () {
    return gulp.src('./src/fonts/**/*.{woff,woff2}',
                {base: './src'})
                .pipe(gulp.dest('./build'));
}

function js () {
    return gulp.src('./src/js/**/*.js')
                .pipe(gulp.dest('./build/js'))
                .pipe(browserSync.stream());
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch('./src/sass/**/*.scss', style);
    gulp.watch('./src/*.html', html);
    gulp.watch('./src/js/**/*.js', js);
    gulp.watch('./src/img/sprite/icon-*.svg', svgSprite);
    gulp.watch([
        './src/img/**/*.{png,jpg,svg}',
        '!./src/img/{sprite,sprite/**}'
    ], imgMin);
}

let build = gulp.series(clear, gulp.parallel(html, style, js, svgSprite, imgMin, fonts), watch);

gulp.task('build', build);