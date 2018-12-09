import React from "react";
import dva from "dva";
import { Router, Route } from "dva/router";
import Login from "../../components/login"; //登录
import createLoading from "dva-loading";
import "./index.scss";
// 1. Initialize
const app = dva();

// 3. Model
app.model(require("../../models/login").default);

// 4. 注册视图
app.router(({ history, app }) => {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
    </Router>
  );
});

// 5. Loading
app.use(createLoading(createLoading));

// 5. Start
app.start("#root");
export default app._store; // eslint-disable-line
