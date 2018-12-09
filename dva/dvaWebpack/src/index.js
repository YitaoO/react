import dva from "dva";
import { createBrowserHistory as createHistory } from "history"; //去掉#
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require("./models/listData").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
