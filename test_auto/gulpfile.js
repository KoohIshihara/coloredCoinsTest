var gulp = require("gulp");
var webserver = require('gulp-webserver');

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