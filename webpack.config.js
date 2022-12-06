var webpack = require("webpack");
const path = require('path');
const resolve = require('resolve');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: './src/js/init.js',
  output: {
      publicPath: '/',
      filename: 'dist/js/brabbl.dev.js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'APP_ENV': JSON.stringify(process.env.APP_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb|de)$/),
    new ExtractTextPlugin('main.css'),
  ],
  devServer: {
    port: 8080,
  },
  devtool: 'source-map',

  module: {
     rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),

            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
            ],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
            compact: false,
          },
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: require.resolve('babel-loader')
        },
        {
          test: /\.scss$/,
          include: /src/,
          loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader')
              ]
        },
        {
          test: /\.css$/,
          loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader')
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            require.resolve('url-loader'),
            require.resolve('img-loader')
          ]
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
                loader: 'file-loader',
                options: {
                    name:       '[name].[ext]',
                    outputPath: './public/fonts/',
                    publicPath: '/public/fonts/'
                }
             }
          ]
        },
        // font-awesome
        {
          test: /font-awesome\.config\.js/,
          use: [
            { loader: 'style-loader' },
            { loader: 'font-awesome-loader' }
          ]
        },
      ],
    },
  resolve: {
      extensions: ['.js', '.jsx']
    }
};
