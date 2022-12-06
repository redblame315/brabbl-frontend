var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/js/init.js'
    },
    output: {
        path: __dirname + `/dist/build/${process.env.APP_ENV}/`,
        publicPath: 'https://api.brabbl.com/embed/',
        filename: 'brabbl.js'
      },
      optimization: {
        minimize: true //Update this to true or false
      },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      new HtmlWebPackPlugin({
        template: "./list.html",
        filename: "./list.html"
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
          exclude: /src\/css\/themes\/.+\.scss$/,
          loaders: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
        },
        {
          test: /src\/css\/themes\/.+\.scss$/,
          loader: "file-loader?name=./themes/[name].css!sass-loader"
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
                'url-loader?limit=8192',
                'img-loader'
              ]
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
      ],
    },
  resolve: {
      extensions: ['.js', '.jsx']
    }
};
