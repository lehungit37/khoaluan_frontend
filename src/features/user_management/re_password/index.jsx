import React from "react";
import { Box, Paper, Typography, Button, Grid, Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import style from "./style";
import FormTextField from "../../../custom_fileds/hook-form/text_field";
import { login } from "../../../app/user_slice";
import color from "../../../constant/color";

const schema = yup.object({
  password: yup.string().required("Vui lòng nhập lại mật khẩu cũ"),
  newpassword: yup.string().required("Vui lòng nhập mật khẩu mới")
});

const useStyles = makeStyles(style);
function RePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    api: {
      auth: {
        login: { status }
      }
    }
  } = useSelector((state) => state.userReducer);
  const history = useHistory();
  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {password: "" }
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        toast.success("Cập nhật mật khẩu thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
        Cookies.set("token", res.token);
        history.push("/");
      })
      .catch((error) => {
        toast.error(
          error.messages || "Hệ thống đang bảo trì, vui lòng quay lại sau",
          {
            position: "bottom-left",
            autoClose: 2000
          }
        );
      });
  };

  return (
 <>
  <Box className = {classes.header}> <Typography variant="h5" >Đổi mật khẩu</Typography></Box>

    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ paddingTop: "8%" }}
    >
      <Grid item md={4} className={classes.formItem}>
        {/* <Paper className={classes.paper}>Đăng nhập</Paper> */}
        <Box
          className={classes.formBox}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormTextField
            control={control}
            name={"password"}
            label="Mật khẩu cũ"
            size="small"
            type="password"
          />
          <FormTextField
            control={control}
            name={"newpassword"}
            label="Mật khẩu mới"
            size="small"
            type="password"
          />
          <Box display={"flex"} justifyContent="center">
            <LoadingButton
              variant="contained"
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
              loading={status === "pending"}
              type="submit"
            >
              Cập nhật
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>
  );
}

export default RePassword;
