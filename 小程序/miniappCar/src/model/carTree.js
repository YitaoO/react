import Taro from "@tarojs/taro";
import { reqListTreeCar } from "../services/api";
import Dialog from "../components/dialog";
import { log } from "util";

export default {
  namespace: "carTree",
  state: {
    listTreeCar: [], //车辆树
    isMultiSelect: false, //是否多选
    choiceCar: null, //选中的单个车辆信息
    choiceFatherId: [], //父集合
    choiceCarsId: [], //选中车辆id集合
    showList: [] //展示默认
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {
    // 获取车辆树
    *getCarTree({ payload }, { call, put }) {
      let response = yield call(reqListTreeCar, payload);
      Dialog.hideLoading();
      yield put({
        type: "saveState",
        response: {
          listTreeCar: response,
          showList: [String(response[0].projSubId)]
        }
      });
    }
  }
};
