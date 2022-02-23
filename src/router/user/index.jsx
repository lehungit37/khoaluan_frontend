import React from 'react'
import {Switch, Route, BrowserRouter, useLocation, Redirect} from 'react-router-dom';
import AdminLayout from '../../layout/admin_layout';
import {UserRouterLocal} from './router'
import AdminMainRoute from '../admin';

function UserMainRouter() {
  

  return (
    <Switch>
      {
        UserRouterLocal?.map((item, key) => {
          return (
            <Route exact path={item.path} component={item.component} key = {key} />
          )
        })
      }
     <AdminLayout path={"/admin"} component ={AdminMainRoute} />
    </Switch>
  );
}

export default UserMainRouter