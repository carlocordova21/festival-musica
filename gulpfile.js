const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

sass.compiler = require('dart-sass');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    images: 'src/img/**/*',
    scss: './src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
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
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
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
    .pipe(notify({ messagek: 'Version webp' }));
}

function watchFiles() {
    watch(paths.scss, css);
    // * = La carpeta actual
    // ** = Todos los archivos con esa extension
    watch(paths.js, javascript);
    
}

exports.css = css;
exports.minifyImages = minifyImages;
exports.watchFiles = watchFiles;

exports.default = series (css, javascript, minifyImages, webpimg, watchFiles);