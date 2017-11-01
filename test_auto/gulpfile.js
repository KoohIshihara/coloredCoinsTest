var gulp = require("gulp");
var webserver = require('gulp-webserver');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var SERVER_PORT = 4000;


gulp.task('default', function() {
  // place code for your default task here
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: SERVER_PORT
    }));
});


gulp.task('js', function(){
  browserify({
    entries: ['js/app.js'], // ビルド対象のファイルを指定
    extensions: [], // 省略できる拡張子の指定
  })
  .bundle()
  .pipe(source('main.js')) // ビルド後のファイル名
  .pipe(gulp.dest('js/')); // ビルド後のファイルを配置するディレクトリ
});