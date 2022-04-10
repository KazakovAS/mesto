const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const path = require('path');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './build'),
    // watchFiles: [path.resolve(__dirname, './src/**/*')],
    port: 8080,
    open: true,
    client: {
      reconnect: true,
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  devtool: 'eval-cheap-module-source-map',
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 100,
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  }
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});

