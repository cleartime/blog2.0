var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextWebapckPlugin = require('extract-text-webpack-plugin'); //引入插件

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: { //导入的时候不用写拓展名
    extensions: [' ', '.js', '.json', '.vue', '.styl', '.css'],
    alias: { // 别名
      'asstes': resolve('src/asstes'),
      'style': resolve('src/style'),
      'views': resolve('src/views'),
      'components': resolve('src/components'),
      'mixins': resolve('src/mixins'),
      'router': resolve('src/router'),
      '@': resolve('src')
    }
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, //防止重复保存频繁重新编译,300ms内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  devServer: {
    inline: true, // 实时刷新
    compress: true,
    port: 2500,
    historyApiFallback: true // 不跳转
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextWebapckPlugin.extract({
              use: 'css-loader'
            }),
          }
        },
        include: [resolve('src')],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new ExtractTextWebapckPlugin('style.css')
  ]
};

module.exports = config;