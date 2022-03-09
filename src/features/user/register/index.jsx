import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Link, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { register } from "../../../app/user_slice";
import FormTextField from "../../../custom_fileds/hook-form/text_field";
import style from "./style";

const schema = yup.object({
  userName: yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  name: yup.string().required("Vui lòng nhập họ và tên"),
  phoneNumber: yup
    .string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      "Định dạng số điện thoại không đúng"
    )
    .length(10, "Định dạng số điện thoại không đúng")
    .required("Vui lòng nhập số điện thoại"),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Định dạng email không đúng. Ví dụ: abc@bc.abc"
    )
    .required("Vui lòng nhập địa chỉ email")
});

const useStyles = makeStyles(style);
function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    api: {
      auth: {
        register: { status }
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
    defaultValues: { userName: "", password: "" }
  });

  const onSubmit = (data) => {
    dispatch(register(data))
      .unwrap()
      .then(() => {
        toast.success("Đăng ký thành công", {
          position: "bottom-left",
          autoClose: 2000,
          options: {
            limit: 5
          }
        });
        history.push("/login");
        reset();
      })
      .catch((error) => {
        toast.error(
          error.messages || "Hệ thống đang bảo trì, vui lòng quay lại sau",
          {
            position: "bottom-left",
            autoClose: 2000,

            limit: 5
          }
        );
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "5% 0%" }}
    >
      <Grid item md={4} className={classes.formItem}>
        {/* <Paper className={classes.paper}>Đăng nhập</Paper> */}
        <Stack>
          <Box
            className={classes.formBox}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormTextField
              control={control}
              name={"name"}
              label="Họ và tên"
              size="small"
            />
            <FormTextField
              control={control}
              name={"phoneNumber"}
              label="Số điện thoại"
              size="small"
            />
            <FormTextField
              control={control}
              name={"email"}
              label="Email"
              size="small"
            />
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
          </Box>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <LoadingButton
              loading={status === "pending" ? true : false}
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng ký
            </LoadingButton>
          </Box>
        </Stack>

        <Grid container justifyContent="space-between" marginTop={2}>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Bạn quên mật khẩu ?
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push("/login");
              }}
            >
              Bạn đã có tài khoản ?
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
