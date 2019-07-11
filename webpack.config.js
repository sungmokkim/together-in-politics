const nodeExternals = require('webpack-node-externals');
const path = require('path');

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: false }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                // quality: 75
                enabled: false
              }
            }
          }
        ]
      }
    ]
  }
};

const clientConfig = {
  ...commonConfig,
  entry: './src/client/client.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

const serverConfig = {
  ...commonConfig,
  target: 'node',
  entry: './src/server/server.js',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];
