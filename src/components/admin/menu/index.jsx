import React from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Grid,
  List,
  Typography,
  Avatar
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

import style from "./style";
import Cookies from "js-cookie";
const menuList = [
  {
    title: "Quản lý bài đăng",
    path: "/admin/quan-ly-bai-dang",
    icon: <ListAltOutlinedIcon />
  },
  {
    title: "Quản lý danh mục",
    path: "/admin/quan-ly-danh-muc",
    icon: <CategoryOutlinedIcon />
  },

  {
    title: "Quản lý người dùng",
    path: "/admin/quan-ly-nguoi-dung",
    icon: <ManageAccountsOutlinedIcon />
  },
  {
    title: "Quản lý quyền",
    path: "/admin/quan-ly-quyen",
    icon: <SecurityOutlinedIcon />
  }
];

const useStyles = makeStyles(style);
const MenuAdmin = () => {
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const classes = useStyles();
  const renderMenuList = () => {
    return (
      <>
        {menuList.map((menu, index) => {
          return (
            <>
              <NavLink exact to={menu.path}>
                <ListItem button key={index}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItem>
              </NavLink>
              <Divider />
            </>
          );
        })}
        <NavLink exact to={"/admin/login"}>
          <ListItem
            button
            onClick={() => {
              Cookies.remove("token");
            }}
          >
            <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
            <ListItemText primary={"Đăng xuất"} />
          </ListItem>
        </NavLink>
      </>
    );
  };

  return (
    <Box
      sx={{
        overflow: "auto"
      }}
    >
      <Box
        sx={{
          padding: "10px 20px"
        }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={me?.imageUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{me?.name}</Typography>
            <Typography variant="p">{me?.phoneNumber}</Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="p">
      Số dư:{" "}
      <Typography sx={{ fontWeight: "bold" }} variant="span">
        {customMoney(me?.money)}
      </Typography>
    </Typography> */}
      </Box>
      <Divider />
      <List className={classes.link}>{renderMenuList()}</List>
    </Box>
  );
};

export default MenuAdmin;
