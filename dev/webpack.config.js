const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const __root = path.join(__dirname, '../');
const port = 3000;

const base = {
  resolve: {
    alias: {
      assets: path.join(__root, 'src/assets'),
      components: path.join(__root, 'src/components'),
      core: path.join(__root, 'src/core'),
      helpers: path.join(__root, 'src/helpers'),
      src: path.join(__root, 'src'),
    },
  },
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
      {
        test: /\.png$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin(
      [{ from: path.join(__root, 'src/static'), ignore: '.DS_Store' }]
    ),
  ]
};

const dev = {
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
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-relative-loader'],
        include: path.join(__root, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__root, 'src/index.html'),
      inject: 'body',
    }),
  ],
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
};

const prod = {
  entry: {
    main: path.join(__root, 'src/main.js'),
    polyfills: ['whatwg-fetch'],
  },
  output: {
    filename: '[chunkhash].[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__root, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-relative-loader'],
        }),
        include: path.join(__root, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfills'],
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
     template: path.join(__root, 'src/index.html'),
     inject: 'body',
     filename: '200.html',
   }),
   new ExtractTextPlugin('styles.css'),
  ],
  performance: {
    hints: 'warning',
  },
};

module.exports = (env = {}) => {
  if (env.production) return merge(base, prod);
  return merge(base, dev);
};
