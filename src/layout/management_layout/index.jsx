import React from 'react'
import {Route} from 'react-router-dom'

function ManagementLayout({component: Component, ...rest}) {
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

export default ManagementLayout