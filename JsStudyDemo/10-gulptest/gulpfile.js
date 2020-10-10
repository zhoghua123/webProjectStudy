const gulp = require('gulp');
 // 使用gulp.task()方法建立任务
 gulp.task('first', () => {
     // 获取要处理的文件 
     gulp.src('./src/css/base.css')
     // 将处理后的文件输出到dist目录 
     .pipe(gulp.dest('./dist/css')); 
 });