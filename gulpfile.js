const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

sass.compiler = require('dart-sass');

const paths = {
    images: 'src/img/**/*',
    scss: './src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
        .pipe(sass())
        .pipe(dest('./build/css'));
}

function minifyCSS() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'));
}

function javascript() {
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/js'));
}

function minifyImages() {
    return src(paths.images)
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({ message: 'Imagen minificada' }));
}

function webpimg() {
    return src(paths.images)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({ message: 'Version webp' }));
}

function watchFiles() {
    watch(paths.scss, css);
    // * = La carpeta actual
    // ** = Todos los archivos con esa extension
    watch(paths.js, javascript);
    
}

exports.css = css;
exports.minifyCSS = minifyCSS;
exports.javascript = javascript;
exports.minifyImages = minifyImages;
exports.watchFiles = watchFiles;
exports.webpimg = webpimg;

exports.default = series (css, javascript, minifyImages, webpimg, watchFiles);