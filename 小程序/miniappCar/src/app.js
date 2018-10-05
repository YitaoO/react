import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import Test from "./pages/test";
import dva from "./dva";
import models from "./model";
import { Provider } from "@tarojs/redux";
import wxTools from "./components/tools/wx_tools";
import "./app.scss";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch({
      type: "sys/error",
      e
    });
  }
});

const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      // "pages/test/index", // 行驶统计首页
      "pages/travel/index", // 行驶统计首页
      "pages/index/index", //首页
      "pages/alarm/index", //告警首页
      "pages/travelDetail/index", //行驶统计详情

      "pages/history/index", //历史轨迹-主页
      "pages/registration/index", //注册页
      "pages/traceDetail/index", //轨迹详情
      "pages/choiceCar/index", //选择车辆
      "pages/oil/index", //燃油首页
      "pages/water/index" //洒水首页
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#58bdf2",
      navigationBarTitleText: "设备动态管理",
      navigationBarTextStyle: "white",
      enablePullDownRefresh: true
    }
  };

  componentDidMount() {
    // 获取openId
    wxTools.addCloud();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Provider store={store}>{/* <Test /> */}</Provider>;
  }
}

Taro.render(<App />, document.getElementById("app"));
