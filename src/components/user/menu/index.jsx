import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  MenuItem,
  Divider
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import Images from "../../../constant/images";
import { Link, NavLink, useHistory } from "react-router-dom";

import style, { StyledMenu } from "./style";
import color from "../../../constant/color";
import { getMenu } from "../../../app/menu_slice";
import { stringToSlug, customMoney } from "../../../utils/helper";

const useStyles = makeStyles(style);

function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    api: {
      getMenu: { status, categories }
    }
  } = useSelector((state) => state.menuReducer);
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const token = Cookies.get("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModelMenu, setOpenModelMenu] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenModelMenu(true);
  };
  const handleClose = (path) => {
    setOpenModelMenu(false);
    setAnchorEl(null);
    history.push(path);
  };

  const handleLogout = () => {
    setOpenModelMenu(false);
    Cookies.remove("token");
  };

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  const accountManagementList = [
    {
      title: "Đăng tin cho thuê",
      icon: <AddOutlinedIcon />,
      path: "/quan-ly/dang-tin-moi"
    },
    {
      title: "Quản lý tin đăng",
      icon: <ListAltOutlinedIcon />,
      path: "/quan-ly/tin-dang"
    },
    {
      title: "Thông tin cá nhân",
      icon: <AccountCircleOutlinedIcon />
    },
    {
      title: "Tin đã lưu",
      icon: <FavoriteOutlinedIcon />
    }
  ];

  const renderMenuItem = () => {
    return (
      <>
        {accountManagementList?.map((item, key) => {
          return (
            <MenuItem onClick={() => handleClose(item.path)} key={key}>
              {item.icon}
              {item.title}
            </MenuItem>
          );
        })}
        <MenuItem onClick={handleLogout}>
          <LogoutOutlinedIcon />
          Đăng xuất
        </MenuItem>
      </>
    );
  };
  return (
    <>
      <Box className={classes.root}>
        <Grid container justifyContent={"space-between"}>
          <Grid item md={2}>
            <Link to="/">
              <img className={classes.image} src={Images.MAIN_LOGO} />
            </Link>
          </Grid>
          <Grid
            item
            md={10}
            display="flex"
            justifyContent={"flex-end"}
            alignItems="center"
          >
            {!token ? (
              <Grid
                container
                justifyContent={"flex-end"}
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Typography>FastRoom xin chào</Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => history.push("/login")}
                    variant="contained"
                  >
                    Đăng nhập
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<AddOutlinedIcon />}
                    onClick={() => history.push("/login")}
                    color="error"
                  >
                    Đăng tin mới
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Link style={{ textDecoration: "none", color: color.BLACK }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Avatar alt="Remy Sharp" src={me?.imageUrl} />
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        spacing={2}
                      >
                        <Typography
                          variant="p"
                          sx={{ marginBottom: "5px !important" }}
                        >
                          Xin chào,
                          <Typography
                            className={classes.nameUser}
                            variant="span"
                          >
                            {me?.name}
                          </Typography>
                        </Typography>
                        <Typography variant="p">
                          Số dư:
                          <Typography
                            className={classes.nameUser}
                            variant="span"
                          >
                            {customMoney(me?.money)}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={handleClick}
                    >
                      Quản lý tài khoản
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button"
                      }}
                      anchorEl={anchorEl}
                      open={openModelMenu}
                      onClose={handleClose}
                    >
                      {renderMenuItem()}
                    </StyledMenu>
                  </Grid>
                  <Grid item>
                    <Button
                      endIcon={<AddOutlinedIcon />}
                      color="error"
                      variant="contained"
                      onClick={() => history.push("/quan-ly/dang-tin-moi")}
                    >
                      Đăng tin mới
                    </Button>
                  </Grid>
                </Grid>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          className={classes.navbar}
          container
          justifyContent="center"
          columnSpacing={1}
        >
          <Grid item className={classes.navbarItem}>
            <NavLink exact to="/">
              Trang chủ
            </NavLink>
          </Grid>
          {categories?.map((category, key) => {
            return (
              <Grid key={key} item className={classes.navbarItem}>
                <NavLink
                  to={`/${stringToSlug(category.nameCategories)}/${
                    category.id
                  }`}
                >
                  {category.nameCategories}
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default Menu;
