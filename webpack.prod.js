/*  ========================================================================
    # Webpack - Production
    ========================================================================  */

/**
 * Configuration only used for production.
 */

// Configs
const settings = require('./webpack.settings.js');
const common = require('./webpack.common.js');

// Modules
const path = require('path');
const { merge } = require('webpack-merge');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// SCSS
// =============================================================================

const SCSS = () => {
  return {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 3,
          sourceMap: false
        }
      },
      {
        loader: 'clean-css-loader',
        options: {
          level: {
            2: {
              mergeMedia: false
            }
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('autoprefixer')({
                cascade: false
              })
            ]
          }
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  };
};

// Config Production
// =============================================================================

const production = {
  mode: 'production',
  output: {
    publicPath: settings.urls.live + settings.urls.publicPath,
    filename: 'js/[name].min.[contenthash].js'
  },
  module: {
    rules: [SCSS()]
  },
  optimization: {
    minimizer: [
      // Terser Webpack Plugin
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          keep_fnames: false,
          keep_classnames: true,
          format: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    // Clean Webpack Plugin
    new CleanWebpackPlugin({
      verbose: false,
      dry: false
    }),

    // Mini CSS Extract Plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.[contenthash].css'
    }),

    // HTML Webpack Plugin - Index
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: '../index.html',
      inject: 'body',
      minify: {
        removeComments: 'true',
        collapseWhitespace: 'true',
        preserveLineBreaks: 'true',
        minifyCSS: 'false',
        minifyJS: 'false'
      }
    })
  ]
};

module.exports = merge(common, production);
