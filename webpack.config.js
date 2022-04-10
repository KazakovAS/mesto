const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/scripts/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: '[name].[contenthash][ext]'
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
      }
    ]
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
