import Inferno from "inferno";
import { Router } from "inferno-router";
import { createBrowserHistory } from "history";
import "./assets/style/entry.css";
import { Provider } from "inferno-mobx";
require("offline-plugin/runtime").install();
const onEnter = require("./components/helpers/onEnter").default;
import autorun from "./autorun";
import stores from "./client/stores";
import routes from "./client/routes";

// React to changes
autorun(stores);

if (module.hot) autorun(stores);

// Fetch data on route change
const container = document.getElementById("root");
window.browserHistory = createBrowserHistory();
const routing = routes(stores);

window.browserHistory.listen(location => {
  onEnter(match(routing, location), stores);
});

Inferno.render(
<Provider {...stores}>
<Router history={window.browserHistory}>
{routing}
</Router>
</Provider>,
  container
);
