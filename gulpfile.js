var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

var sassPaths = [
//   'node_modules/foundation-sites/scss',
//   'node_modules/motion-ui/src'
];

function sass() {
  return gulp.src('assets/sass/theme.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
};

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("assets/sass/**/*.{scss,sass}", sass);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('sass', sass);
gulp.task('serve', gulp.series('sass', serve));
gulp.task('default', gulp.series('sass', serve));
