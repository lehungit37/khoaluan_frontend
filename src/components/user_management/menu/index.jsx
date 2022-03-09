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
  Avatar
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import style from "./style";
import { customMoney } from "../../../utils/helper";
import { useSelector } from "react-redux";

const useStyles = makeStyles(style);
function MenuManagement() {
  const classes = useStyles();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const menuList = [
    {
      title: "Đăng tin",
      icon: <AddOutlinedIcon />,
      path: "/quan-ly/dang-tin-moi"
    },
    {
      title: "Quản lý tin đăng",
      icon: <ListAltOutlinedIcon />,
      path: "/quan-ly/tin-dang"
    },

    {
      title: "Sửa thông tin cá nhân",
      icon: <BorderColorOutlinedIcon />,
      path: "/quan-ly/thong-tin-ca-nhan"
    },
    {
      title: "Tin đã lưu",
      icon: <BorderColorOutlinedIcon />,
      path: "/quan-ly/thong-tin-ca-nhan"
    }
  ];

  const renderMenuList = () => {
    return menuList.map((menu, index) => {
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
    });
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ padding: "10px 20px" }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={me?.imageUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{me?.name}</Typography>
            <Typography variant="p">{me?.phoneNumber}</Typography>
          </Grid>
        </Grid>
        <Typography variant="p">
          Số dư:{" "}
          <Typography sx={{ fontWeight: "bold" }} variant="span">
            {customMoney(me?.money)}
          </Typography>
        </Typography>
      </Box>
      <Divider />
      <List className={classes.link}>{renderMenuList()}</List>
    </Box>
  );
}

export default MenuManagement;
