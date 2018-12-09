import dva from "dva";
import { createBrowserHistory as createHistory } from "history"; //去掉#
import createLoading from "dva-loading";
import UserInfo from "../../models/userInfo"; //用户信息模块
import Memu from "../../models/menu"; //菜单模块
import Device from "../../models/device"; //设备情况

import "./index.scss";

// 1. Initialize
const app = dva();

// 3. Model（//TODO:后期把一部分放在路由上）
let arrModel = [UserInfo, Device, Memu];
arrModel.forEach(item => {
  app.model(item);
});

// 4. Router
app.router(require("../../router/index").default);

// 5. Loading
app.use(createLoading(createLoading));

// 5. Start
app.start("#root");
export default app._store; // eslint-disable-line
