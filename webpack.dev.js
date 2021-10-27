const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                require('react-refresh/babel')
              ].filter(Boolean)
            }
          }
        ]
      }, {
        test: /\.(css|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3000/api/v1')
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle.css'
    }),
    new ReactRefreshWebpackPlugin()
  ]
})
