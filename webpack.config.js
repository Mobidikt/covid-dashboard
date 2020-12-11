const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

function setDMode() {
  return isProd ? 'production' : 'development'
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
    },
  ]

  if (!isProd) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports = {
  mode: setDMode(),
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: !isProd ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: !isProd,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(jgp|png|jpeg|svg)/,
        use: ['file-loader'],
      },
    ],
  },
}
