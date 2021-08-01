/*  ========================================================================
    # Webpack - Settings
    ========================================================================  */

// DotEnv
require('dotenv').config();

module.exports = {
  urls: {
    live: '/',
    publicPath: 'dist/'
  },

  entries: {
    app: ['./src/js/main.js', './src/css/main.scss']
  },

  copy: [
    // Favicons
    {
      from: './src/images/favicons',
      to: './images/favicons',
      noErrorOnMissing: true
    }
  ],

  developmentServer: {
    public: () => {
      return process.env.DEVSERVER_PUBLIC || 'http://localhost:8080';
    },
    host: () => {
      return process.env.DEVSERVER_HOST || 'localhost';
    },
    port: () => {
      return process.env.DEVSERVER_PORT || 8080;
    },
    https: () => {
      return process.env.DEVSERVER_HTTPS || false;
    },
    poll: () => {
      return process.env.DEVSERVER_POLL || false;
    }
  }
};
