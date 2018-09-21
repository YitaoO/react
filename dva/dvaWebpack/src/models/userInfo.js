/**
 * model - login
 */
import jsCookie from "js-cookie";

export default {
  namespace: "userInfo",

  state: {
    userInfo: jsCookie.getJSON("wb_lot_userInfo") //用户数据
  },

  reducers: {
    //设置数据
    // saveItem(state, action) {
    //   return {
    //     ...state,
    //     userInfo: action.payload
    //   };
    // }
  }
};
