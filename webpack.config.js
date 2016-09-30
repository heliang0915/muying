var path = require('path')
var webpack=require("webpack");
var WebpackDevServer=require("webpack-dev-server");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var vue=require("vue-loader");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'build');

module.exports = {
  entry: {
    app: APP_PATH,
    libs:['vue','vue-router','vue-resource','vuex','vue-touch']
  },
  output: {
    path:BUILD_PATH,
    publishPath: '/build/' ,//'build/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue','.css'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      { test: /\.css$/, 
        //将分散的css合并
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        //,
        // exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=1&name=[path][name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      }
    ]
  },
  devServer: {
      publicPath: "/",
      stats: { colors: true },
      port: 8099,
      inline: true
  },
  vue: {
    loaders:{
      css:"style!css"
    }
  },
  proxy: {
      '/api': {
        target: 'http://www.baidu.com',
        secure: false
      }
  },
  babel:{
      presets:['es2015','stage-2'],
      plugins:['transform-runtime']
  },
  devtool:"#source-map",
  //第三方库配置
  plugins:[
      //合并第三方代码
      new CommonsChunkPlugin({
        name:"libs",
        filename:"libs.js",
        minChunks:Infinity
      }),

      //压缩时去掉警告
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin("app.css"),//合并css
      new webpack.HotModuleReplacementPlugin()
  ]
}
