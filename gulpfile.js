const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite=require('gulp-svg-sprite');

const reload = browserSync.reload;
sass.compiler = require('node-sass');

task('clean', () => {
    return src('dist/**/*', { read: false }).pipe( rm() );
});

task('copy:html', () => {
  return src('src/*.html')
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }));
});

task('copy:css', () => {
    return src('src/css/*.css')
        .pipe(dest('dist/css'))
        .pipe(reload({ stream: true }));
});

task('copy:favicon', () => {
  return src('src/*.ico')
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }));
});


task('copy:fonts', () => {
  return src('src/fonts/**/*.*')
      .pipe(dest('dist/fonts'))
      .pipe(reload({ stream: true }));
});

task('copy:images', () => {
    return src('src/images/**/*.*')
        .pipe(dest('dist/images'))
        .pipe(reload({ stream: true }));
});

task('copy:upload', () => {
  return src('src/upload/**/*.*')
      .pipe(dest('dist/upload'))
      .pipe(reload({ stream: true }));
});

const styles = [
    'src/sass/style.sass'
];

task('styles', () => {
    return src(styles)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.sass'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(autoprefixer({
            cascade: false
        }))
        //.pipe(gcmq())
        //.pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
        .pipe(reload({stream: true}));
});

task('icons', () => {
    return src('src/images/nurse/sprite/*.svg')
        .pipe(
            svgo({
                plugins: [
                    {
                        removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
                    }
                ]
            })
        )
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: "../nurse_sprite.svg"
                    }
                }
            })
         )
        .pipe(dest("dist/images/nurse/sprites"));
});

task("scripts", () => {
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js', { newLine: ";" }))
        .pipe(babel({
                presets: ['@babel/env']
            })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
        .pipe(reload({stream: true}))
});

task("scripts:nurse", () => {
    return src('src/js/nurse/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('nurse.min.js', { newLine: ";" }))
        .pipe(babel({
                presets: ['@babel/env']
            })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
        .pipe(reload({stream: true}))
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/floatthead/dist/jquery.floatThead.js'
];
task("scripts:jsLibs", () => {
    return src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('libs.min.js', { newLine: ";" }))
        .pipe(babel({
                presets: ['@babel/env']
            })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
        .pipe(reload({stream: true}))
});

task('copy:jsComponents', () => {
    return src('src/js/components/*.js')
        .pipe(dest('dist/js/components'))
        .pipe(reload({ stream: true }));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

watch('./src/sass/**/*.sass', series("styles"));
watch('./src/js/*.js', series("scripts"));
watch('./src/js/nurse/*.js', series("scripts:nurse"));
watch('./src/*.html', series("copy:html"));
watch('./src/*.css', series("copy:css"));
watch('./src/*.ico', series("copy:favicon"));
watch('./src/fonts/**/*.*', series("copy:fonts"));
watch('./src/images/**/*.*', series("copy:images"));
watch('./src/upload/**/*.*', series("copy:upload"));
watch('./src/js/components/*.js', series("copy:jsComponents"));
watch('./src/images/nurse/sprite/*.svg', series("icons"));

//task("default", series('clean', parallel('copy:html', 'copy:favicon', 'copy:fonts', 'copy:images', 'styles', 'icons', 'scripts'), 'server'));
task("default", series('clean', parallel('copy:html', 'copy:favicon', 'copy:css', 'copy:fonts', 'copy:images', 'copy:upload', 'icons', 'copy:jsComponents', 'styles', 'scripts:jsLibs', 'scripts', 'scripts:nurse'), 'server'));