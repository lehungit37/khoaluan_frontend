import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ManagementRouteLocal } from "./router";
function ManagementMainRouter() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        {ManagementRouteLocal?.map((item, key) => {
          return (
            <Route
              exact
              path={`${path}${item.path}`}
              component={item.component}
              key={key}
            />
          );
        })}
      </Switch>
    </>
  );
}

export default ManagementMainRouter;
