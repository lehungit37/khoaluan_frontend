import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../../app/menu_slice";
import { Grid, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import style from "./style";
import { stringToSlug } from "../../../utils/helper";
import Images from "./../../../constant/images";

const useStyles = makeStyles(style);

const MenuTop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    api: {
      getMenu: { status, categories }
    }
  } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item md={2}>
        <Box sx={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={Images.LOGO_2} />
        </Box>
      </Grid>
      <Grid item md={10}>
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
      </Grid>
    </Grid>
  );
};
export default MenuTop;
