const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/scripts/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: '',
    clean: true,
    assetModuleFilename: '[name].[contenthash][ext]'
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './build'),
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
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(webp|png|svg|jpe?g|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff?2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // sourceMap: true,
            }
          }
        ]
      },
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
              },
            },
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html'
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // ...baseWebpackConfig.externals.paths_pages.map(
    //   (page) =>
    //     new HtmlWebpackPlugin({
    //       template: `${baseWebpackConfig.externals.paths_dir}/${page}`,
    //       filename: `./${page}`,
    //     }),
    // ),
  ]
}
