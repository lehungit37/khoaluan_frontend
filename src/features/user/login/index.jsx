import React, { useState } from "react";
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
import { getInfo, login } from "../../../app/user_slice";
import color from "../../../constant/color";
import { openModal } from "../../../app/modal_slice";
import ModalForgetPassword from "./component/modal_forget_password";
import { truncate } from "lodash";

const schema = yup.object({
  userName: yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const useStyles = makeStyles(style);
function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const {
    api: {
      auth: {
        login: { status },
      },
    },
  } = useSelector((state) => state.userReducer);
  const history = useHistory();
  const {
    control,
    reset,
    handleSubmit,
    formState: {},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: "", password: "" },
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        toast.success("Đăng nhập thành công", {
          position: "bottom-left",
          autoClose: 2000,
        });
        Cookies.set("token", res.token, { expires: 2 / 24 });
        dispatch(getInfo());
        history.push("/");
      })
      .catch((error) => {
        toast.error(
          error.messages || "Hệ thống đang bảo trì, vui lòng quay lại sau",
          {
            position: "bottom-left",
            autoClose: 2000,
          }
        );
      });
  };

  const handleOpenModalForgetPassword = () => {
    setOpenModal(true);
  };

  return (
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
            name={"userName"}
            label="Tên đăng nhập"
            size="small"
          />
          <FormTextField
            control={control}
            name={"password"}
            label="Mật khẩu"
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
              Đăng nhập
            </LoadingButton>
          </Box>
        </Box>

        <Grid container justifyContent="space-between" marginTop={2}>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={handleOpenModalForgetPassword}
            >
              Bạn quên mật khẩu ?
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push("/dang-ky");
              }}
            >
              Tạo tài khoản mới
            </Link>
          </Grid>
        </Grid>
      </Grid>

      <ModalForgetPassword open={openModal} setOpen={setOpenModal} />
    </Grid>
  );
}

export default Login;
