import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import style from "./style";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "../../../custom_fileds/hook-form/text_field";

import { loginWithAdmin } from "../../../app/user_slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const schema = yup
  .object({
    userName: yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: yup.string().required("Vui lòng nhập mật khẩu")
  })
  .required();

const useStyles = makeStyles(style);

function LoginAdmin() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    api: {
      auth: {
        login: { status }
      }
    }
  } = useSelector((state) => state.userReducer);
  const {
    control,
    handleSubmit,
    reset,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: "", password: "" }
  });

  const onSubmit = (data) => {
    dispatch(loginWithAdmin(data))
      .unwrap()
      .then(() => {
        history.push("/admin/quan-ly-bai-dang");
        toast.success("Đăng nhập thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };

  return (
    <Box className={classes.boxContainer}>
      <Box className={classes.boxForm}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.boxTitle}>
            <Typography variant="h5">Hệ thống hỗ trợ phòng trọ</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              position: "relative",
              width: "100%"
            }}
          >
            <FormTextField
              control={control}
              name="userName"
              label="Tên đăng nhập"
              size="small"
            />

            <FormTextField
              control={control}
              name="password"
              label="Mật khẩu"
              size="small"
              type="password"
            />
          </Box>

          <Box textAlign="center" sx={{ marginTop: "20px" }}>
            <LoadingButton
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
              loading={status === "pending"}
            >
              Đăng nhập
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginAdmin;
