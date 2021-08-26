/*  ========================================================================
    # Webpack - Common
    ========================================================================  */

/**
 * General used configuration.
 */

// Configs
const pkg = require('./package.json');
const settings = require('./webpack.settings.js');

// Modules
const path = require('path');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

// JavaScript
// =============================================================================

const JavaScript = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: {
                version: 3,
                proposals: true
              },
              useBuiltIns: 'usage',
              targets: {
                browsers: pkg.browserslist
              }
            }
          ]
        ],
        plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
      }
    }
  };
};

// Images
// =============================================================================

const Images = () => {
  return {
    test: /\.(jpe?g|png|gif|svg|webp)$/,
    exclude: /node_modules/,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]'
    }
  };
};

// Fonts
// =============================================================================

const Fonts = () => {
  return {
    test: /\.(woff2|woff|eot|otf|ttf)$/,
    exclude: /node_modules/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]'
    }
  };
};

// Config Common
// =============================================================================

const common = {
  name: pkg.name,
  entry: settings.entries,
  output: {
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    rules: [JavaScript(), Images(), Fonts()]
  },
  plugins: [
    // Copy Webpack Plugin
    new CopyWebpackPlugin({
      patterns: settings.copy
    })
  ]
};

module.exports = common;
