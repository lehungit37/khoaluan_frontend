import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  MenuItem,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
import { stringToSlug } from "../../../utils/helper";
import ReponMenu from "./repon";

const useStyles = makeStyles(style);

function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    api: {
      getMenu: { status, categories },
    },
  } = useSelector((state) => state.menuReducer);
  const {
    api: {
      getInfo: { me },
    },
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
      path: "/quan-ly/dang-tin-moi",
    },
    {
      title: "Quản lý tin đăng",
      icon: <ListAltOutlinedIcon />,
      path: "/quan-ly/tin-dang",
    },
    {
      title: "Thông tin cá nhân",
      icon: <AccountCircleOutlinedIcon />,
      path: "/quan-ly/thong-tin-ca-nhan",
    },
    // {
    //   title: "Tin đã lưu",
    //   icon: <FavoriteOutlinedIcon />,
    // },
  ];

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
            {token && me.id ? (
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
                        onClick={() =>
                          history.push("/quan-ly/thong-tin-ca-nhan")
                        }
                      >
                        <Typography variant="p">
                          Xin chào,
                          <Typography
                            className={classes.nameUser}
                            variant="span"
                          >
                            {me?.name}
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
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={openModelMenu}
                      onClose={handleClose}
                    >
                      {accountManagementList?.map((item, key) => {
                        return (
                          <MenuItem
                            onClick={() => handleClose(item.path)}
                            key={key}
                          >
                            {item.icon}
                            {item.title}
                          </MenuItem>
                        );
                      })}
                      <MenuItem onClick={handleLogout}>
                        <LogoutOutlinedIcon />
                        Đăng xuất
                      </MenuItem>
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
            ) : (
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
          <Typography
            sx={{
              display: "none",
              "@media(max-width:768px)": {
                display: "block",
              },
            }}
          >
            <ReponMenu />
          </Typography>
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
