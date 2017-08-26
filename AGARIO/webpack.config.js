const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './src/server/Main.js',
  output: {
    filename: './server.js',
    library: 'myApp'
  },
  node: {
    fs: "empty",
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
};