"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSessionId(isLogin) {
  return new Promise(function (resolve) {
    if (!!isLogin) {
      resolve({
        "content-type": "application/json"
      });
    } else {
      wx.getStorage({
        key: "sessionId",
        success: function success(res) {
          //TODO:这里逻辑待优化，太多判断
          resolve({
            "content-type": "application/json",
            Cookie: !!res.data ? "WEBID=" + res.data : ""
          });
        }
      });
    }
  });
}
function request(opt, isLogin) {
  return getSessionId(isLogin).then(function (header) {
    opt.header = header;
    return _index2.default.request(opt).then(function (res) {
      var statusCode = res.statusCode;
      var _res$data = res.data,
          code = _res$data.code,
          data = _res$data.data;


      if (statusCode >= 200 && statusCode < 300) {
        if (code == 0) {
          if (!data) {
            _index4.default.showAlert("暂无数据...", "", 5000);
            return false;
          }
          return data;
        } else if (code == "0001") {
          //注册
          //TODO:返回首页
          _index2.default.navigateTo({ url: "/pages/registration/index" });
          return false;
        } else if (code == "-1") {
          _index2.default.showAlert(res.data.message, "warn", 3000);
          console.log("错误=" + res.data.message);
          return false;
        }
      } else {
        _index4.default.hideLoading();
        _index4.default.showAlert("\u72B6\u6001\u7801-" + statusCode, "warn", 2000);
        throw new Error("\u7F51\u7EDC\u8BF7\u6C42\u9519\u8BEF\uFF0C\u72B6\u6001\u7801" + statusCode);
      }
    });
  });
}