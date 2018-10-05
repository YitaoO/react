import { promises } from "fs";

/**
 * 小程序自带工具
 */

class WxTools {
  // 获取用户信息
  getUserInfo() {
    return new Promise(function(resolve) {
      wx.getUserInfo({
        success: function(res) {
          console.log(res.userInfo);
          resolve(res.userInfo);
        }
      });
    });
  }
  // 加入云功能
  addCloud() {
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
  getOpenId() {
    return new Promise(function(resolve, reject) {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        success: res => {
          console.log("[云函数] [login] user openid: ", res.result);
          resolve(res.result);
        },
        fail: err => {
          console.error("[云函数] [login] 调用失败", err);
          reject(err);
        }
      });
    });
  }
}

export default new WxTools();
