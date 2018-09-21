const path = require("path");
// const utils = require("./utils");
const baseWebpackConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const config = require("./config");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const apiMocker = require("webpack-api-mocker");

const Dashboard = require("webpack-dashboard");
const DashboardPlugin = require("webpack-dashboard/plugin");
const dashboard = new Dashboard();

module.exports = merge(baseWebpackConfig, {
  //   mode: "development",
  devtool: config.dev.devtool,
  devServer: {
    before(app) {
      apiMocker(app, path.resolve("src/mock/index.js"), {
        proxy: {
          "/api/": "https://api.github.com/"
        },
        changeHost: true
      });
    },
    contentBase: "../dist",
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    openPage: "login.html"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: {
                "primary-color": "#17b990",
                "link-color": "#1DA57A",
                "border-radius-base": "2px"
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              //引入全局样式
              resources: [
                path.resolve(__dirname, "../src/style/common.scss"),
                path.resolve(__dirname, "../src/style/mixin.scss")
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 可视化构建过程
    new DashboardPlugin(dashboard.setData),

    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), "dist/index.html"),
      template: "index.html",
      inject: "body",
      hash: true,
      chunks: ["commons", "vendor", "index"],
      excludeChunks: ["login"]
    }),
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), "dist/login.html"),
      template: "login.html",
      inject: "body",
      hash: true,
      chunks: ["commons", "vendor", "login"],
      excludeChunks: ["index"]
    }),
    // 热更新
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
