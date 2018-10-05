import Taro from "@tarojs/taro";
import { reqWeixinAdd, reqLogin } from "../services/api";
import Dialog from "../components/dialog";

export default {
  namespace: "userInfo",
  state: {
    openId: "",
    weixinUserInfo: {}, //微信用户信息
    carUserInfo: "" //车辆用户信息
  },
  reducers: {
    saveOpenId(state, payload) {
      return {
        ...state,
        openId: payload.openId
      };
    },
    saveUserInfo(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    },
    saveCarUserInfo(state, payload) {
      return {
        ...state,
        carUserInfo: payload.response
      };
    }
  },
  effects: {
    // 注册
    *weixinAdd({ payload }, { call, put }) {
      let response = yield call(reqWeixinAdd, payload);
      Dialog.hideLoading();
      Taro.navigateTo({
        url: `/pages/index/index`
      });
    },
    // 登录
    *login({ payload }, { call, put }) {
      let response = yield call(reqLogin, payload);
      //TODO:这里因为在别的地方要用到，所以用了缓存，后期看看可以在model直接取吗
      wx.setStorage({
        key: "sessionId",
        data: response.sessionId
      });

      yield put({
        type: "saveCarUserInfo",
        response
      });
    }
  }
};
