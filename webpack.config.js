const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: {
    main: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '',
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
    compress: true,
    historyApiFallback: true
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
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              }
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

    new CleanWebpackPlugin()
  ]
}
