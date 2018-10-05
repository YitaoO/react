import Taro from "@tarojs/taro";
import Dialog from "../components/dialog";
function getSessionId(isLogin) {
  return new Promise(function(resolve) {
    if (!!isLogin) {
      resolve({
        "content-type": "application/json"
      });
    } else {
      wx.getStorage({
        key: "sessionId",
        success: function(res) {
          //TODO:这里逻辑待优化，太多判断
          resolve({
            "content-type": "application/json",
            Cookie: !!res.data ? `WEBID=${res.data}` : ""
          });
        }
      });
    }
  });
}
export default function request(opt, isLogin) {
  return getSessionId(isLogin).then(function(header) {
    opt.header = header;
    return Taro.request(opt).then(res => {
      let { statusCode } = res;
      let { code, data } = res.data;

      if (statusCode >= 200 && statusCode < 300) {
        if (code == 0) {
          if (!data) {
            Dialog.showAlert("暂无数据...", "", 5000);
            return false;
          }
          return data;
        } else if (code == "0001") {
          //注册
          //TODO:返回首页
          Taro.navigateTo({ url: "/pages/registration/index" });
          return false;
        } else if (code == "-1") {
          Taro.showAlert(res.data.message, "warn", 3000);
          console.log("错误=" + res.data.message);
          return false;
        }
      } else {
        Dialog.hideLoading();
        Dialog.showAlert(`状态码-${statusCode}`, "warn", 2000);
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    });
  });
}
