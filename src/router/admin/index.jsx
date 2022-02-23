import React from 'react'
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom"
import AdminRouteLocal from './router';


function AdminMainRoute() {
    const {path} = useRouteMatch()

  return (
    <Switch>
      {AdminRouteLocal?.map((item) => (
        <Route exact path={`${path}${item.path}`} component={item.component} />
      ))}
    </Switch>
  );
}

export default AdminMainRoute