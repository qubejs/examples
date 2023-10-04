var paths = require('../../tools/scripts/paths');
var path = require('path');
// const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VERSION = process.env.VERSION;

module.exports = {
  entry: {
    gray: [`./apps/web/src/styles/themes/ice/index.scss`],
  },
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: process.env.NODE_ENV !== 'production' ? paths.webAssets : paths.distWeb,
    filename: `static/js/[name]/out.js`,
    assetModuleFilename: `media/[hash][ext][query]`,
  },
  resolve: {
    alias: {
      'src-assets': path.resolve(__dirname, 'apps/web/src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              // Add this option
              // url: false,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [paths.webSrc, paths.webStyles, paths.webAssets],
              },
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name]${VERSION ? `.${VERSION}` : ''}.css`,
      chunkFilename: `[id]${VERSION ? `.${VERSION}` : ''}.css`,
    }),
  ],
};
