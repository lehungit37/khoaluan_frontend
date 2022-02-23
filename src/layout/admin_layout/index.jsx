import React from 'react'
import {Switch, Route, useRouteMatch} from "react-router-dom"
import UserManagement from '../../features/admin/user_management';

function AdminLayout({component: Component, ...rest}) {
    
  return (
   <>
    <Route {...rest} render = {(routeProps) => (
        <>
        <Component routeProps={routeProps} />
            </>
    )} />
   </>
   
  );
}

export default AdminLayout