const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.(css|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3000/api/v1')
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle.css'
    })
  ]
})
