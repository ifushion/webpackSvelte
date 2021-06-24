const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { sass } = require('svelte-preprocess-sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css插件

const pagesPath = path.join(__dirname, 'src/pages');

function scanEntry() {
  let entry = {};
  glob.sync(pagesPath + '/**/*.js').forEach(name => {
    name = path.normalize(name);
    const chunkName = name.replace(pagesPath, '').replace(/\\/g, '/').replace('.js', '');
    entry[chunkName] = name;
  })
  return entry;
}

const endrys = scanEntry();

function buildHtmlWebpackPlugins() {
  let chunkFilenames = Object.keys(endrys);
  return chunkFilenames.map(item => {
    let conf = {
      filename: `${item.slice(1)}.html`,
      template: path.join(__dirname, './index.html'),
      inject: true,
      chunks: [item],
      minify: true,
    }
    return new HtmlWebpackPlugin(conf);
  })
}

const htmlPlugins = buildHtmlWebpackPlugins();

module.exports = {
  entry: endrys,
  output: {
    path: path.resolve('./dist'),
    filename: 'assets/js/[name]-[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.svelte', '.json', '.scss', '.css'],
    alias: {
      "@": path.resolve('./src'),
    }
  },
  devServer: {
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              css: false
            },
            emitCss: true,
            preprocess: {
              style: sass(),
            },
          }
        },
      },
      {
        test: /\.(sc|c|sa)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter')  // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000000 * 1024,
          fallback: 'file-loader',
          outputPath: 'assets/img',
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]_[contenthash].css',
    }),
    new CssMinimizerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPlugins,
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    // runtimeChunk: {
    //   name: 'manifest',
    // },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        utilCommon: {
          name: 'common',
          minSize: 0,
          minChunks: 2,
          priority: -20,
        }
      }
    }
  },
  stats: {
    assets: false,
    modules: false,
    entrypoints: false,
  }
}