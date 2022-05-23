import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import style from "./style";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../app/modal_slice";
import { forgetPassword } from "../../../../app/user_slice";
import { register } from "./../../../../app/user_slice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(style);
const schema = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Định dạng email không đúng"
      )
      .required("Vui lòng nhập email"),
    userName: yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: yup.string().required("Vui lòng nhập mật khẩu")
  })
  .required();

const Step3ChangePassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleNext, setOpen } = props;

  const {
    phoneNumber,
    api: {
      auth: {
        register: { status }
      }
    }
  } = useSelector((state) => state.userReducer);

  const classes = useStyles();

  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      userName: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    data.phoneNumber = phoneNumber;
    dispatch(register(data))
      .unwrap()
      .then(() => {
        toast.success("Đăng ký thành công", { position: "bottom-left" });
        history.push("/login");
        reset();
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  return (
    <Box
      className={classes.formBox}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container flexDirection="column" rowSpacing={2}>
        <Grid item>
          <FormTextField
            control={control}
            name={"name"}
            label="Họ và tên"
            size="small"
          />
        </Grid>
        <Grid item>
          <FormTextField
            control={control}
            name={"email"}
            label="Email"
            size="small"
          />
        </Grid>
        <Grid item>
          <FormTextField
            control={control}
            name={"userName"}
            label="Tên đăng nhập"
            size="small"
          />
        </Grid>
        <Grid item>
          <FormTextField
            control={control}
            name={"password"}
            label="Mật khẩu"
            size="small"
            type="password"
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={status == "pending"}
        >
          {status == "pending" ? "Đang Đăng ký" : " Đăng ký"}
        </Button>
      </Box>
    </Box>
  );
};

export default Step3ChangePassword;
