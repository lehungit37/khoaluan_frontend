import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getInfo } from "../../app/user_slice";
import { setAuthToken } from "./../../api/axios_client";

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
      {!token && !me.id && <Redirect from={`admin`} to={`/admin/login`} />}
      {token && me.id && <Redirect from="/admin/login" to={`${pathname}`} />}
      {!token && !me.id && (
        <>
          <Redirect from={`${pathname}`} to={`/admin/login`} />
        </>
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
