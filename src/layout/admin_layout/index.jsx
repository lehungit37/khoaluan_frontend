import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from "react-router-dom";
import UserManagement from "../../features/admin/user_management";
import { Button } from "@mui/material";
import useAuthAdmin from "./../../hook/useAuthAdmin";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setAuthToken } from "./../../api/axios_client";
import { getInfo } from "../../app/user_slice";

function AdminLayout({ component: Component, ...rest }) {
  const { pathname } = useLocation();
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfo());
    }
  }, [token]);

  return (
    <>
      {token && me.id && <Redirect from="/admin/login" to={`${pathname}`} />}
      {!token && !me.id && (
        <Redirect from={`${pathname}`} to={`/admin/login`} />
      )}
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

export default AdminLayout;
