/*  ========================================================================
    # Webpack - Development
    ========================================================================  */

/**
 * Configuration only used for development.
 */

// Configs
const settings = require('./webpack.settings.js');
const common = require('./webpack.common.js');

// Modules
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Development Server
// =============================================================================

const devServer = () => {
  return {
    host: settings.developmentServer.host(),
    port: settings.developmentServer.port(),
    https: !!parseInt(settings.developmentServer.https(), 10),
    static: {
      directory: path.resolve(__dirname, './src/'),
      publicPath: '/',
      watch: {
        poll: settings.developmentServer.poll(),
        ignored: /node_modules/
      }
    },
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};

// SCSS
// =============================================================================

const SCSS = () => {
  return {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader'
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

// Config Development
// =============================================================================

const development = {
  mode: 'development',
  devServer: devServer(),
  output: {
    publicPath: settings.developmentServer.public() + '/',
    filename: 'js/[name].min.[hash].js'
  },
  module: {
    rules: [SCSS()]
  },
  plugins: [
    // Hot Module Replacement Plugin
    new webpack.HotModuleReplacementPlugin(),

    // HTML Webpack Plugin - Index
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: 'false',
        collapseWhitespace: 'true',
        preserveLineBreaks: 'true',
        minifyCSS: 'false',
        minifyJS: 'false'
      }
    })
  ]
};

module.exports = merge(common, development);
