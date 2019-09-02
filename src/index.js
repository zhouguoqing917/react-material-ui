import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

// core components
import Admin from "layouts/Admin.js";

import "assets/scss/material-kit-react.scss?v=1.8.0";
import landingRoutes from "./routes/landingRoutes";
import theme from "./theme";

const hist = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        {landingRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/demo" />
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
