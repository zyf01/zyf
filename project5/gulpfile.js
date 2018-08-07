var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("copy-index",function(){
	gulp.src("index.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\zyf"));
});

gulp.task("copy-html",function(){
	gulp.src("*.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\zyf"));
});

gulp.task("copy-img",function(){
	gulp.src("img/*.jpg").pipe(gulp.dest("D:\\phpStudy\\WWW\\zyf\\img"));
});
	

gulp.task("concatjs",function(){
	gulp.src(["js/index.js","js/goodslist.js"])
	.pipe(concat("common.js"))
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\zyf\\js"));
})

//压缩：
/*
gulp.task("uglifyjs",function(){
	gulp.src("js/index.js")
	.pipe(uglify())
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\gulp1803\\js"));
})
*/

//合并并压缩js文件
gulp.task("concat-uglify-js",function(){
	gulp.src(["js/index.js","js/goodslist.js"])
	.pipe(concat("common.js"))
	.pipe(uglify())
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\gulp1803\\js"));
})

//合并,压缩,重命名js文件
gulp.task("concat-uglify-rename-js",function(){
	gulp.src(["js/index.js","js/goodslist.js"])
	.pipe(concat("common.js"))
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\gulp1803\\js"))
	.pipe(uglify())
	.pipe(rename("common.min.js"))
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\gulp1803\\js"));
})

gulp.task("watchall",function(){
	gulp.watch("*.html",["copy-html"]);
	gulp.watch("img/*.jpg",["copy-img"]);
	gulp.watch(["js/index.js","js/goodslist.js"],["concat-uglify-rename-js"]);
})
