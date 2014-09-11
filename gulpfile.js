var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node,
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

var paths = {
  scripts: ['./views/*.html', './scripts/**/*.js', './styles/css/*.css'],
  server_scripts: ['./server_scripts/*.js']
};

gulp.task('server', function() {
  if(node) node.kill();

  node = spawn('node', ['index.js'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if(code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  })
});

gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  gulp.watch(paths.server_scripts, ['server']);

  gulp.watch(paths.scripts).on('change', livereload.changed);
});

gulp.task('default', ['server','watch']);

process.on('exit', function() {
  if(node) node.kill();
});
