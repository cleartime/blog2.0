var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');  //引入插件

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash].js'
  },

  resolve: {  //导入的时候不用写拓展名
      extensions: [' ', '.js', '.json', '.vue', '.sass', '.scss', '.css'],
      alias: { // 别名
        'asstes': resolve('src/asstes'),
        'style': resolve('src/style'),
        'views': resolve('src/views'),
        'components': resolve('src/components'),
        'mixins': resolve('src/mixins'),
        'router': resolve('src/router'),
      }
  },
  watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
      poll: 1000  //每秒询问的文件变更的次数
  },
  devServer:{
      inline: true,
      compress: true,
      host: '127.0.0.1',
      port: 2500,
      historyApiFallback: true
  },
  module: {
    rules: [
       {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { 
          loaders: { 
            css: ExtractTextWebapckPlugin.extract({ use: 'css-loader' }) 
          }
        },
        include: [resolve('src')],
      },
      {
        test: /\.sass$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
      { 
        test: /\.(png|jpg|gif)$/, 
        use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
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