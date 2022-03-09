import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Cookies from "js-cookie";
import MenuManagement from "../../components/user_management/menu";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../../api/axios_client";
import { getInfo } from "../../app/user_slice";

const drawerWidth = 240;
function ManagementLayout({ component: Component, ...rest }) {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getInfo());
    }
  }, [token]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              FastRoom
            </Typography>
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
    </>
  );
}

export default ManagementLayout;
