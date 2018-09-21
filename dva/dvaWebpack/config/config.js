/**
 * 配置文件
 */
const path = require("path");
const projectName = require("../package.json").name;

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/wpms/",
    proxyTable: {
      "/api/": {
        // target: 'https://test200.gxyfrr.cc/wpms/',
        target: "localhost/mock/",
        changeOrigin: true
      }
    },
    host: "localhost",
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map",
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    assetsRoot: path.resolve(__dirname, `../dist/${projectName}`),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report //是否开启分析
  }
};
