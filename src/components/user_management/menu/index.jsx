import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import style from "./style";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

const useStyles = makeStyles(style);

function MenuManagement() {
  const classes = useStyles();
  const {
    api: {
      getInfo: { me },
    },
  } = useSelector((state) => state.userReducer);

  const menuList = [
    {
      title: "Đăng tin",
      icon: <AddOutlinedIcon />,
      path: "/quan-ly/dang-tin-moi",
    },
    {
      title: "Quản lý tin đăng",
      icon: <ListAltOutlinedIcon />,
      path: "/quan-ly/tin-dang",
    },

    {
      title: "Thông tin cá nhân",
      icon: <AssignmentIndIcon />,
      path: "/quan-ly/thong-tin-ca-nhan",
    },
  ];

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
        <NavLink exact to={"/"}>
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
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          padding: "10px 20px",
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
}

export default MenuManagement;
