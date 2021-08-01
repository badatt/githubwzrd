const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx',
  },
  output: { path: outPath, filename: 'bundle.js' },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      meta: {
        title: packageJson.name,
        description: packageJson.description,
        keywords: Array.isArray(packageJson.keywords) ? packageJson.keywords.join(',') : undefined,
      },
    }),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
};
