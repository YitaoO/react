import { reqSearch } from "../services/api";
import Dialog from "../components/dialog/index";
export default {
  namespace: "search",
  state: {
    navFixed: false, //导航是否固定
    isCar: false, //车辆选择
    isTime: false, //时间选择
    isDate: false, //日期选择
    timeDialog: false, // 是否显示日期选择
    timeArr: [
      "1小时/班",
      "2小时/班",
      "3小时/班",
      "4小时/班",
      "5小时/班",
      "6小时/班",
      "7小时/班",
      "8小时/班",
      "9小时/班",
      "10小时/班",
      "11小时/班",
      "12小时/班",
      "13小时/班",
      "14小时/班",
      "15小时/班",
      "16小时/班",
      "17小时/班",
      "18小时/班",
      "19小时/班",
      "20小时/班",
      "21小时/班",
      "22小时/班",
      "23小时/班",
      "24小时/班"
    ],
    dayHour: 7, //台班规则
    bdate: "", // 开始时间
    edate: "", //结束时间
    searchParams: {}, //搜索请求参数
    searchPage: 1,
    searchLimit: 20,
    searchLists: [] //搜索结果数据
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
    // 搜索数据
    *getList({ payload }, { call, put }) {
      const { url, params } = payload;
      const response = yield call(reqSearch, url, params);
      Dialog.hideLoading();
      yield put({
        type: "saveState",
        response: {
          searchLists: response.data
        }
      });
    }
  }
};
