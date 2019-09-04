const path = require('path')
const { DefinePlugin } = require('webpack')

const { resolve } = path

const alias = {
  API: resolve(__dirname, '../src/api'),
  COMPONENTS: resolve(__dirname, '../src/components'),
  CONTAINERS: resolve(__dirname, '../src/containers'),
  REDUX: resolve(__dirname, '../src/redux'),
  ENV: resolve(__dirname, '../env'),
  RESOURCE: resolve(__dirname, '../src/resource'),
  UTILS: resolve(__dirname, '../src/utils'),
  LIBS: resolve(__dirname, '../src/libs')
}

const svgLoader = {
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {}
    },
    'svgo-loader'
  ]
}

const cssLoader = {
  test: /\.css$/,
  use: [{ loader: 'raw-loader' }]
}

const loaders = {
  svgLoader,
  cssLoader
}

module.exports = {
  context: path.resolve(__dirname, '../src/'),
  entry: ['./containers/AppBarEntry.jsx'],
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      loaders.cssLoader,
      loaders.svgLoader
    ]
  },
  output: {
    jsonpFunction: 'webpackJsonp_seniverse_plugin_v4',
    path: path.join(__dirname, '../out/'),
    filename: 'appbar/appbar-latest.js'
  },
  plugins: [
    new DefinePlugin({
      'process.env.EXPORT_ENV': JSON.stringify(process.env.EXPORT_ENV),
      'process.env.EXPORT_TARGET': JSON.stringify('outer')
    })
  ]
}
