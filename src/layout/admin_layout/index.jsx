import React from 'react'
import {Switch, Route, useRouteMatch} from "react-router-dom"
import UserManagement from '../../features/admin/user_management';
import {Button} from '@mui/material'
function AdminLayout({component: Component, ...rest}) {
    
  return (
    <>
      <Route
        {...rest}
        render={(routeProps) => (
          <>
            <Component {...routeProps} />
          </>
        )}
      />
    </>
  );
}

export default AdminLayout