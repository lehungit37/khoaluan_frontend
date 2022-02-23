import React from 'react'
import {Switch, Route, BrowserRouter, useLocation} from  'react-router-dom'
import Dashboard from '../../features/user/dashboard'
import ManagementPost from '../../features/user/management_post'
import {UserRouterLocal} from '../../router/user/router'

function UserLayout({component: Component, ...rest}) {
  return (
    
    <>
      <Route {...rest} render = {(routeProps) => (
        <Component {...routeProps} />
      )} />
    </>
   
  );
}

export default UserLayout