import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/styles/layouts/landingStyle.js";

import landingRoutes from "../routes/landingRoutes";

let ps;

const switchRoutes = (
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
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Landing({ ...rest }) {
  // styles
  const classes = useStyles();

  return (
    <div className={classes.landingWrapper}>
      {switchRoutes}
    </div>
  );
}
