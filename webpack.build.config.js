const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 95,
              },
              webp: {
                lossless: 1,
              },
              avif: {
                cqLevel: 0,
              }
            }
          }
        }
      })
    ]
  }
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});

