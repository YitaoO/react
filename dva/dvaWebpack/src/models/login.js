/**
 * model - login
 */
import jsCookie from "js-cookie";

import { reqLogin } from "../services/api";
export default {
  namespace: "login",
  state: {
    userInfo: {} //用户数据
  },

  effects: {
    // 获取数据
    *fetchLogin({ paylod }, { call, put }) {
      const response = yield call(reqLogin, {
        account: paylod.account,
        password: paylod.password
      });
      if (!!paylod.checked) {
        jsCookie.set("wb_lot_loginInfo", paylod);
      } else {
        jsCookie.remove("wb_lot_loginInfo");
      }
      jsCookie.set("wb_lot_userInfo", response.data);
      yield put({
        type: "saveItem",
        payload: response.data
      });
    }
  },

  reducers: {
    //设置数据
    saveItem(state, action) {
      return {
        ...state,
        userInfo: action.payload
      };
    }
  }
};
