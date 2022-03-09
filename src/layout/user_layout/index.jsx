import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import Menu from "../../components/user/menu";
import Dashboard from "../../features/user/dashboard";
import ManagementPost from "../../features/user_management/management_post";
import { UserRouterLocal } from "../../router/user/router";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../app/user_slice";
import Cookies from "js-cookie";
import { setAuthToken } from "../../api/axios_client";

import color from "../../constant/color";
import { Redirect } from "react-router-dom";
function UserLayout({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfo());
    }
  }, [token]);

  return (
    <div >
      <Menu />
      {token && <Redirect from="/login" to="/" />}
      <Route
        {...rest}
        render={(routeProps) => (
          <>
            <Component {...routeProps} />
          </>
        )}
      />
    </div>
  );
}

export default UserLayout;
