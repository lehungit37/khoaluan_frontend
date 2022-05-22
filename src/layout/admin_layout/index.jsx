import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation, useHistory } from "react-router-dom";
import { getInfo, getInfoAdmin } from "../../app/user_slice";
import MenuAdmin from "../../components/admin/menu";
import { setAuthToken } from "./../../api/axios_client";
import ModalController from "./../../custom_fileds/modal_controller/index";

function AdminLayout({ component: Component, ...rest }) {
  const { pathname } = useLocation();
  const token = Cookies.get("token");
  const modalReducer = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfoAdmin())
        .unwrap()
        .then()
        .catch((error) => {
          history.push("/admin/login");
        });
    }
  }, [token]);

  return (
    <>
      {!token && !me.id && (
        <>
          <Redirect from={`${pathname}`} to={`/admin/login`} />
        </>
      )}

      {token && me.id && <Redirect from="/admin/login" to={`${pathname}`} />}
      <Grid container>
        <Grid md={2.5}>{token && me.id && <MenuAdmin />}</Grid>
        <Grid item md={token && me?.id ? 9.5 : 12}>
          <Route
            {...rest}
            render={(routeProps) => (
              <>
                <Component {...routeProps} />
              </>
            )}
          />
        </Grid>
      </Grid>

      <ModalController modalReducer={modalReducer} />
    </>
  );
}

export default AdminLayout;
