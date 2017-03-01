var gulp = require("gulp");
var del = require("del");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

gulp.task("clean:dist",function(cb){
    del(['./dist/*'],cb)
})

gulp.task("build",function(){
    webpack(webpackConfig);
})

