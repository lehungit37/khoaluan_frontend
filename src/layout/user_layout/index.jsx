import React, { useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import Menu from "../../components/user/menu";
import Dashboard from "../../features/user/home_page";
import ManagementPost from "../../features/user_management/management_post";
import { UserRouterLocal } from "../../router/user/router";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../app/user_slice";
import Cookies from "js-cookie";
import { setAuthToken } from "../../api/axios_client";
import Footer from "../../components/user/footer";
import color from "../../constant/color";
import { Redirect } from "react-router-dom";
import Messager from "../../components/support_message";

function UserLayout({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { pathname } = useLocation();
  const {
    api: {
      getInfo: { me },
    },
  } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfo());
    }
  }, [token]);

  let path = "";
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Menu />
      {token && me && <Redirect from="/login" to={`${pathname}`} />}
      <Route
        {...rest}
        render={(routeProps) => (
          <>
            <Component {...routeProps} />
          </>
        )}
      />
      <Messager />
    </div>
  );
}

export default UserLayout;
