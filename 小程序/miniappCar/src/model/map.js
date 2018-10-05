export default {
  namespace: "map",
  state: {
    type: 0, //0:首页；1：轨迹
    showMarkerInfo: false,
    markerInfo: {}
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {}
};
