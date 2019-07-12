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
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img'
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
