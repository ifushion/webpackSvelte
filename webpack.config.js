const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件

const htmlDir = path.join(__dirname, 'public/');
const srcDir = path.join(__dirname, 'src/');

function scanEntry() {
  let entry = {};
  glob.sync(srcDir + '/**/*.js').forEach(name => {
    name = path.normalize(name);
    const chunkName = name.replace(srcDir, '').replace(/\\/g, '/').replace('.js', '');
    entry[chunkName] = name;
  })
  return entry;
}

function scnanHtmlTemplate() {
  let htmlEntry = {};
  glob.sync(htmlDir + '/**/*.html', {
    ignore: '**/include/**',
  }).forEach(name => {
    name = path.normalize(name);
    const chunkName = name.replace(htmlDir, '').replace(/\\/g, '/').replace('.html', '');
    htmlEntry[chunkName] = name
  })
  return htmlEntry;
}

function buildHtmlWebpackPlugins() {
  let tpl = scnanHtmlTemplate();
  let chunkFilenames = Object.keys(tpl);
  return chunkFilenames.map(item => {
    let conf = {
      filename: item + '.html',
      template: tpl[item],
      inject: true,
      favicon: path.resolve('./public/favicon.ico'),
      chunks: [item],
      minify: false,
    }
    return new HtmlWebpackPlugin(conf);
  })
}

const entry = scanEntry();
const htmlPlugins = buildHtmlWebpackPlugins();

module.exports = {
  entry,
  output: {
    path: path.resolve('./dist'),
    filename: 'assets/js/[name]-[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    alias: {
      "@": path.resolve('./src'),
    }
  },
  module: {
    rules: [
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
      {
        test: /\.(sc|c|sa)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]_[hash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    ...htmlPlugins,
  ],
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: 'manifest',
    },
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