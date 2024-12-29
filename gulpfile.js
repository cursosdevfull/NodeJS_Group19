const uglify = require('gulp-uglify-es').default;
const { src, dest } = require('gulp');

const minify = () =>
  src('./cache/src/**/*.js').pipe(uglify()).pipe(dest('./dist'));

exports.minify = minify;
