const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const __root = path.join(__dirname, '../');
const port = 3000;

module.exports = env => ({
  entry: {
    main: [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      path.join(__root, 'src/main.js'),
    ],
  },
  output: {
    filename: '[hash]-[id].[name].bundle.js',
  },
  resolve: {
    alias: {
      components: path.join(__root, 'src/components'),
      core: path.join(__root, 'src/core'),
      helpers: path.join(__root, 'src/helpers'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__root, 'src/index.html'),
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        query: {
          configFile: path.join(__root, 'dev/eslint.config.js'),
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.join(__root, 'src'),
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\./, to: '/' },
      ],
    },
    hot: true,
    noInfo: false,
    quiet: false,
    port,
    publicPath: '/',
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
  performance: {
    hints: false,
  },
});
