/**
 * model - tree
 */

import { reqAreaTree } from "../services/api";

export default {
  namespace: "tree",

  state: {
    treeList: [],
    choiceKey: "" //选中的id
  },
  effects: {
    // 获取头部菜单数据
    *fetchAreaList(_, { call, put }) {
      const response = yield call(reqAreaTree);
      yield put({
        type: "saveList",
        payload: Array.isArray(response.data) ? response.data : []
      });
    }
  },
  reducers: {
    //设置数据
    saveList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    }
  }
};
