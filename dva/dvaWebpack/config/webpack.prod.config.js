const path = require("path");
const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const config = require("./config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const webpackConfig = merge(baseWebpackConfig, {
  //   mode: "production",
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  "primary-color": "#17b990",
                  "link-color": "#1DA57A",
                  "border-radius-base": "2px"
                },
                javascriptEnabled: true
              }
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    //全局全局变量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 分离css
    extractSass,
    //压缩
    // new ParallelUglifyPlugin({}),
    new ParallelUglifyPlugin({
      uglifyJS: {
        compress: {
          warnings: false
        }
      }
    }),
    //生成html
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), "dist/login.html"),
      template: "login.html",
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ["vendor", "commons", "login"],
      excludeChunks: ["index"],

      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), "dist/index.html"),
      template: "index.html",
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ["vendor", "commons", "index"],
      excludeChunks: ["login"],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin()
    // 复制文件到指定目录
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, "../static"),
    //     to: "static",
    //     ignore: [".*"]
    //   }
    // ])
  ]
});
console.log(config.build);
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
