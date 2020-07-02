var gulp = require('gulp');
// 压缩html
// gulp中插件应用 下载插件=>引入插件=>应用插件
var htmlClean = require("gulp-htmlclean");
// 压缩图片
var imageMin = require("gulp-imagemin");

// 压缩js
var uglify = require("gulp-uglify");

// 去掉js中的调试语句
var stripDebug = require("gulp-strip-debug");

// 将less转换成css
var less = require("gulp-less");

// 压缩css
var cleanCss = require("gulp-clean-css");

// postcss autoprofixer css自动补全
var postcss = require("gulp-postcss");
var autoprofixer = require("autoprefixer");

// 开启服务器
var connect = require("gulp-connect");

var folder = {
    src: "src/",
    dist: "dist/"
};
// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
// export NODE_ENV=production 设置环境变量
console.log(devMod)


gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
                    .pipe(connect.reload())
        if(!devMod) {
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"));
});

gulp.task("css", function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprofixer()]))
        if (!devMod) {
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"));
});

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if (!devMod) {
            page.pipe(stripDebug())
                .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"));
});

gulp.task("image", function () {
    gulp.src(folder.src + "images/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images/"));
});
// 开启服务器
gulp.task("server", function () {
    connect.server({
        port: "8888",
        livereload: true
    });
});
// 监听文件变化,然后利用connect.reload()自动刷新页面
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
});


gulp.task("default", ["html", "css", "js", "image", "server", "watch"]);


// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()


// gulp 可以看成run task对文件流操作
// webpack module bandle模块化操作，将一切文件看成模块来操作