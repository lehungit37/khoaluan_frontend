import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./index";
import { NavLink } from "react-router-dom";
import { Typography, Avatar, MenuItem, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../../constant/images.js";
import { useHistory } from "react-router-dom";
import style, { StyledMenu } from "./style";
import color from "../../../constant/color.js";
import { getMenu } from "../../../app/menu_slice";
import { stringToSlug } from "../../../utils/helper";
import AppsIcon from "@mui/icons-material/Apps";
import { Grid, Link } from "@mui/material";

import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const useStyles = makeStyles(style);

function ReponMenu() {
  const [open, setOpen] = React.useState(true);

  const handleclick = () => {
    setOpen(!open);
  };

  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //menu
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

  // eslint-disable-next-line no-undef
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
    {
      title: "Tin đã lưu",
      icon: <FavoriteOutlinedIcon />,
    },
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
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box padding={"1rem 0"}>
              <Grid>
                <Grid item md={12} alignItems="center">
                  {token && me.id ? (
                    <Link
                      style={{ textDecoration: "none", color: color.BLACK }}
                    >
                      <Grid
                        container
                        spacing={2}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <Grid item>
                          <Grid
                            spacing={1}
                            alignItems="center"
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Grid item alignItems="center">
                              <Avatar alt="Remy Sharp" src={me?.imageUrl} />
                            </Grid>
                            <Grid
                              item
                              display="flex"
                              // flexDirection="column"
                              // spacing={2}
                              onClick={() =>
                                history.push("/quan-ly/thong-tin-ca-nhan")
                              }
                            >
                              <Typography
                                variant="p"
                                // sx={{ marginBottom: "5px !important" }}
                              >
                                Xin chào,
                                <Typography
                                  className={classes.nameUser}
                                  variant="span"
                                >
                                  {me?.name}
                                </Typography>
                              </Typography>
                              {/* <Typography variant="p">
                          Số dư:
                          <Typography
                            className={classes.nameUser}
                            variant="span"
                          >
                            {customMoney(me?.money)}
                          </Typography>
                        </Typography> */}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={12}>
                          <List
                            sx={{ bgcolor: "#AAAAAA" }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                          >
                            <ListItemButton onClick={handleclick}>
                              <ListItemText primary="Quản Lý Tài Khoản" />
                              {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                <ListItemButton
                                  sx={{
                                    dispay: "flex",
                                    flexDirection: "column",
                                    padding: "0 !important",
                                  }}
                                >
                                  <ListItemText>
                                    {renderMenuItem()}
                                  </ListItemText>
                                </ListItemButton>
                              </List>
                            </Collapse>
                          </List>
                        </Grid>
                        <Grid item>
                          <Button
                            endIcon={<AddOutlinedIcon />}
                            color="error"
                            variant="contained"
                            onClick={() =>
                              history.push("/quan-ly/dang-tin-moi")
                            }
                          >
                            Đăng tin mới
                          </Button>
                        </Grid>
                      </Grid>
                    </Link>
                  ) : (
                    <Grid
                      container
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      spacing={2}
                      alignItems="center"
                    >
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
            <Divider />
            <Box>
              <Grid columnSpacing={1}>
                <Grid item className={classes.repon_navbarItem}>
                  <NavLink exact to="/">
                    Trang chủ
                  </NavLink>
                </Grid>
                {categories?.map((category, key) => {
                  return (
                    <Grid key={key} item className={classes.repon_navbarItem}>
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
            <Divider />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default ReponMenu;
