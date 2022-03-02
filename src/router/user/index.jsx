import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserRouterLocal } from "./router";

function UserMainRouter() {

  return (
    <Switch>
      {UserRouterLocal?.map((item, key) => {
        return (
          <Route exact path={item.path} component={item.component} key={key} />
        );
      })}
    </Switch>
  );
}

export default UserMainRouter;
