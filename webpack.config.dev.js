const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(scss|css)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, use: [ { loader: 'file-loader' } ] }
    ]
  },
  devServer: {
    compress: true,
    port: 3030
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })]
};
