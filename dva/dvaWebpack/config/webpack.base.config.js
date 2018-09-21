const path = require("path");
const webpack = require("webpack");

const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
module.exports = {
  devtool: "#source-map",
  entry: {
    login: "./src/page/login/index",
    index: "./src/page/index/index"
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    publicPath: ""
  },
  resolve: {
    extensions: [".js", ".jsx", "json"], //别名
    alias: {
      //快捷路径
      components: path.resolve(__dirname, "/../src/components/")
    },
    modules: [resolve("src"), resolve("node_modules")] //解析模块目录
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)?$/,
        // use: ["babel-loader"],
        loader: "happypack/loader?id=happyBabel",
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    //提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      minChunks: 3
    }),
    //第三方
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    }),

    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyBabel",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    })
  ]
};
