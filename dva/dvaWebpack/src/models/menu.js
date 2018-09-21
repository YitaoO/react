/**
 * model - menu
 */

import { reqHeader, reqNavbar } from "../services/api";

export default {
  namespace: "menu",

  state: {
    modId: 100, //头部菜单id
    sideId: "", //侧边菜单id
    headerList: [], //列表
    sideList: []
  },

  effects: {
    // 获取头部菜单数据
    *fetchHeaderList(_, { call, put }) {
      const response = yield call(reqHeader);

      yield put({
        type: "saveHeaderList",
        payload: Array.isArray(response.data) ? response.data : []
      });
    },
    // 获取侧边菜单数据
    *fetchSideList({ payload }, { call, put }) {
      const response = yield call(reqNavbar, payload);
      let list = Array.isArray(response.data) ? response.data : [];
      yield put({
        type: "saveSideList",
        payload: { list: list, modId: payload.modId, sideId: list[0].modId }
      });
    }
  },

  reducers: {
    //设置数据
    saveHeaderList(state, action) {
      return {
        ...state,
        headerList: action.payload
      };
    },
    saveSideList(state, action) {
      return {
        ...state,
        sideList: action.payload.list,
        modId: action.payload.modId,
        sideId: action.payload.sideId
      };
    },
    //切换菜单
    clickSideMenu(state, action) {
      return {
        ...state,
        sideId: action.payload.sideId
      };
    }
  }
};
