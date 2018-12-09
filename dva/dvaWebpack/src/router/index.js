import React from "react";
import { Router, Route, Switch } from "dva/router";
import Main from "../components/main"; //主模版

import State from "../page/state"; //实施情况
import Workbench from "../page/workbench"; //工作台

// const registerModel = (app, model) => {
//   if (
//     !(app._models.filter(m => m.namespace === model.namespace).length === 1)
//   ) {
//     app.model(model);
//   }
// };
//TODO:后期设置为动态按需加载，model模块在这里加载
function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          render={() => (
            <Main>
              <Switch>
                <Route
                  path="/index/state"
                  component={State}
                  // getComponent={(nextState, cb) => {
                  //   require.ensure([], require => {
                  //     registerModel(app, require("../models/devStaCount"));
                  //     cb(null, State);
                  //   });
                  // }}
                />
                <Route path="/index/workbench" component={Workbench} />
              </Switch>
            </Main>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
