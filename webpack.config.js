var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  mode: 'development',
  entry: resolve('./src/main.js'),
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
       {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
	  filename: resolve('dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
};

module.exports = config;