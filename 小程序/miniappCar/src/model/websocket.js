export default {
  namespace: "websoket",
  state: {
    isConnect: "", //是否链接
    data: {} //数据
  },
  reducers: {
    saveData(state, payload) {
      return {
        ...state,
        data: payload.data
      };
    }
  },
  effects: {}
};
