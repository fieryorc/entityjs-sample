var gulp = require("gulp");
var debug = require('gulp-debug');
var tsc = require("gulp-typescript");
var merge = require("merge-stream");
var sourcemaps = require('gulp-sourcemaps');

var bindir = "bin";
var tsProject = tsc.createProject(__dirname + "/tsconfig.json");

gulp.task("build", function () {
    process.chdir(__dirname);
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    var tsOutput = tsResult.js
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest(bindir));

    var dtsOutput = tsResult.dts
        .pipe(gulp.dest(bindir));

    var copyFiles = gulp.src(["package.json", "README.md"])
        .pipe(gulp.dest(bindir));

    return merge(tsOutput, dtsOutput, copyFiles)
        //.pipe(debug({ title: "Output Files:" }))
        ;
});

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], function () {
    process.chdir(__dirname);
    gulp.watch(["**/*.ts"], ["build"]);
});
