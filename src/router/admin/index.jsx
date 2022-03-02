import React from 'react'
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom"
import AdminRouteLocal from './router';
import LoginAdmin from '../../features/admin/login'

function AdminMainRoute() {
    const {path} = useRouteMatch()

  return (
    <Switch>
      {AdminRouteLocal?.map((item, key) => (
        <Route
          exact
          key={key}
          path={`${path}${item.path}`}
          component={item.component}
        />
      ))}
      <Route exact path = {`${path}/login`} component={LoginAdmin}/>
    </Switch>
  );
}

export default AdminMainRoute