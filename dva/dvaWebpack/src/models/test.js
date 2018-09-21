/**
 * model - 测试
 */

import { reqTest } from "../services/api";
export default {
  namespace: "test",

  state: {
    list: [] //用户数据
  },

  effects: {
    // 获取数据
    *fetchList({ paylod }, { call, put }) {
      const response = yield call(reqTest, paylod);
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
        list: action.payload
      };
    }
  }
};
