var fs = require('fs');
var path = require('path')
var config = require('./config');
var WebpackMd5Hash = require('webpack-md5-hash');
var webpack = require("webpack");

var getEntries = function(){
    var dirs = fs.readdirSync("./src");
    var entries = {};
    for(var i =0, len=dirs.length; i<len; i++){
        var dir = "./src/"+dirs[i]
        var files = fs.readdirSync(dir);
        files.map(function(ele){
            var reg = new RegExp('(.+)\\.(js|jsx|ts|tsx)')
            var match = ele.match(reg);
            if(match){
                entries[dirs[i]+match[1]] = [path.resolve(dir,ele)];
            }
        })
    }
    return entries;
}

var webPackConfig = {
    entry: getEntries(),
    output:{
        filename: '[name].[chunkhash:8].[id].js',
        publicPath: '/',
        path: path.resolve(__dirname,"dist")
    },
    plugins:[
        new WebpackMd5Hash()   // it is uesful for chunkhash when only css changes
    ],
    module:{
        noParse: /jquery/,
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname,"src"),
                use:[
                    {
                        loader:"babel-loader"
                    }
                ]
            }
        ]
    },
    resolve:{
        extensions: [".js",".jsx",".ts",".tsx"]
    }
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name : ["vendor","manifest"]
        })   // this plugin is used for vendors
    ]
}

webPackConfig.entry.vendor = ["jquery"]

module.exports = webPackConfig
