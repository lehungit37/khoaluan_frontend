import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Route, Redirect } from "react-router-dom";
import { setAuthToken } from "../../api/axios_client";
import { getInfo } from "../../app/user_slice";
import MenuManagement from "../../components/user_management/menu";
import ModalController from "./../../custom_fileds/modal_controller/index";
import Menu from "./../../components/user/menu";
import MenuTop from "./../../components/user_management/menu_top/index";

const drawerWidth = 240;
function ManagementLayout({ component: Component, ...rest }) {
  const token = Cookies.get("token");
  const { pathname } = useLocation();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const modalReducer = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfo());
    }
  }, [token]);
  return (
    <>
      {token && me.id && <Redirect from="/login" to={`${pathname}`} />}
      {!token && !me.id && <Redirect from={`${pathname}`} to={`/login`} />}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <MenuTop />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          <Toolbar />
          <MenuManagement />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Route
            {...rest}
            render={(routeProps) => (
              <>
                <Component {...routeProps} />
              </>
            )}
          />
        </Box>
      </Box>
      <ModalController modalReducer={modalReducer} />
    </>
  );
}

export default ManagementLayout;
