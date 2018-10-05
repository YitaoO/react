"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 小程序自带工具
 */

var WxTools = function () {
  function WxTools() {
    _classCallCheck(this, WxTools);
  }

  _createClass(WxTools, [{
    key: "getUserInfo",

    // 获取用户信息
    value: function getUserInfo() {
      return new Promise(function (resolve) {
        wx.getUserInfo({
          success: function success(res) {
            console.log(res.userInfo);
            resolve(res.userInfo);
          }
        });
      });
    }
    // 加入云功能

  }, {
    key: "addCloud",
    value: function addCloud() {
      // return new Promise(function(resolve, reject) {
      if (!wx.cloud) {
        console.error("请使用 2.2.3 或以上的基础库以使用云能力");
      } else {
        wx.cloud.init({
          traceUser: true
        });
      }
    }
    // 调用云函数(获取openId)

  }, {
    key: "getOpenId",
    value: function getOpenId() {
      return new Promise(function (resolve, reject) {
        wx.cloud.callFunction({
          name: "login",
          data: {},
          success: function success(res) {
            console.log("[云函数] [login] user openid: ", res.result);
            resolve(res.result);
          },
          fail: function fail(err) {
            console.error("[云函数] [login] 调用失败", err);
            reject(err);
          }
        });
      });
    }
  }]);

  return WxTools;
}();

exports.default = new WxTools();