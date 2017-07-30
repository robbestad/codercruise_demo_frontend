const gulp = require('gulp');
const exec = require('child_process').exec;
const spawn = require("cross-spawn");

// Generate minified bundle
gulp.task('webpack', function(cb) {
  exec('webpack  --config core/webpack.config.dev.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('webpack-watch', (cb) => {
  const webpack_watch = spawn('webpack', ['--watch','--config', 'core/webpack.config.dev.js', '--hot']);

  webpack_watch.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  webpack_watch.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  webpack_watch.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
