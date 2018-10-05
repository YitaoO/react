import Taro from "@tarojs/taro";
import {
  reqCarStateList,
  reqListTreeCar,
  reqCarAccInfo,
  reqCarTrance
} from "../services/api";
import Dialog from "../components/dialog";
const _ = require("lodash");
import carOn from "../images/index_car_on_icon.png";
import carOff from "../images/index_car_off_icon.png";
import StartIcon from "../images/map_trace_start_icon.png";
import EndIcon from "../images/map_trace_end_icon.png";

export default {
  namespace: "car",
  state: {
    carStateList: [], //车辆最新状态
    listTreeCar: [], //车辆树
    choiceCar: null, //选中的车辆
    carGuijiList: {
      page: 1,
      limit: 20,
      list: []
    }, //轨迹
    choiceGuiJi: {}, //选择轨迹
    carGuijiDetail: {} //轨迹详情
  },
  reducers: {
    saveCar(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {
    // 车辆最新状态
    *getCarLastState({ payload }, { call, put }) {
      let response = yield call(reqCarStateList, payload);
      Dialog.hideLoading();
      response.forEach(item => {
        item.id = item.simno;
        item.width = 61;
        item.height = 61;
        item.iconPath = !!item.acc ? carOn : carOff;
      });
      yield put({
        type: "saveCar",
        response: {
          carStateList: response
        }
      });
    },
    // 获取车辆树
    *getCarTree({ payload }, { call, put }) {
      let response = yield call(reqListTreeCar, payload);
      Dialog.hideLoading();
      yield put({
        type: "saveCar",
        response: {
          listTreeCar: response
        }
      });
    },
    // 获取行驶统计
    *getCarList({ payload }, { call, put }) {
      const { page, limit } = payload;
      const response = yield call(reqCarAccInfo, payload);
      Dialog.hideLoading();
      yield put({
        type: "saveCar",
        response: {
          carGuijiList: {
            list: response,
            page: page,
            limit: limit
          }
        }
      });
    },

    // 获取轨迹详情
    *getCarTrance({ payload }, { call, put }) {
      const response = yield call(reqCarTrance, payload);
      const lists = {
        polyline: [],
        Marker: []
      };
      lists.polyline.push({
        points: response.data,
        color: "#fa4949",
        width: 4,
        dottedLine: false,
        arrowLine: true,
        borderColor: "#000",
        borderWidth: 5
      });
      lists.Marker.push({
        id: 0,
        latitude: response.data[0].latitude,
        longitude: response.data[0].longitude,
        iconPath: StartIcon,
        width: 33,
        height: 37
      });
      lists.Marker.push({
        id: 1,
        latitude: _.last(response.data).latitude,
        longitude: _.last(response.data).longitude,
        iconPath: EndIcon,
        width: 23,
        height: 27
      });

      Taro.hideLoading();
      yield put({
        type: "saveCar",
        response: {
          carGuijiDetail: lists
        }
      });
    }
  }
};
