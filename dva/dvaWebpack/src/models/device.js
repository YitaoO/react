/**
 * model - 设备情况
 */
import Utils from "../utils";

import { reqDevStatusCount, reqDevAreaCount } from "../services/api";
export default {
  namespace: "deviceState",

  state: {
    statusCountList: [],
    statusCountItem: {},
    areaList: []
  },

  effects: {
    // 获取数据
    *fetchStatusCount({ payload }, { call, put }) {
      const response = yield call(reqDevStatusCount, payload);
      yield put({
        type: "saveStatusCount",
        payload: response.data
      });
    },
    // 获取数据
    *fetchAreaCount({ payload }, { call, put }) {
      const response = yield call(reqDevAreaCount, payload);
      yield put({
        type: "saveAreaCount",
        payload: response.data
      });
    }
  },

  reducers: {
    //设置数据
    saveStatusCount(state, action) {
      let datas = action.payload;
      let deviceItem = {};
      deviceItem.devCount = datas.devCount; //设备总数
      deviceItem.hintCount = datas.hintCount; //轻微
      deviceItem.ordinaryCount = datas.ordinaryCount; //一般
      deviceItem.severityCount = datas.severityCount; //严重
      deviceItem.location = datas.location;

      deviceItem.list = [
        {
          id: 0,
          percentage: Number(
            Utils.getPercent(datas.onlineCount, datas.devCount)
          ),
          value: datas.onlineCount,
          name: "开启"
        }, //开机
        {
          id: 1,
          percentage: Number(
            Utils.getPercent(datas.shutDownCount, datas.devCount)
          ),
          value: datas.shutDownCount,
          name: "关闭"
        }, //关闭
        {
          id: 2,
          percentage: Number(97),
          value: datas.offlineCount,
          name: "离线"
        }, //离线
        {
          id: 3,
          percentage: Number(
            Utils.getPercent(datas.repairCount, datas.devCount)
          ),
          value: datas.repairCount,
          name: "维修"
        }, //维修
        {
          id: 4,
          percentage: Number(
            Utils.getPercent(datas.pauseCount, datas.devCount)
          ),
          value: datas.pauseCount,
          name: "停用"
        }
      ];

      return {
        ...state,
        statusCountItem: datas,
        statusCountList: deviceItem.list
      };
    },
    saveAreaCount(state, action) {
      return {
        ...state,
        areaList: action.payload
      };
    }
  }
};
