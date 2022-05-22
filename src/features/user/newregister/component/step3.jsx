import React, { useState, useEffect } from "react";
import { Box, Button, Typography,Grid } from "@mui/material";
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

const useStyles = makeStyles(style);
const schema = yup
  .object({
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    confirmPassword: yup.string().required("Vui lòng nhập xác nhận mật khẩu")
  })
  .required();

const Step3ChangePassword = (props) => {
  const dispatch = useDispatch();
  const { handleNext, setOpen } = props;

  const { phoneNumber, loading } = useSelector((state) => state.userReducer);

  const [errorText, setErrorText] = useState("");
  const classes = useStyles();

  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorText("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmitChangePassword = (data) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword == confirmPassword) {
      dispatch(forgetPassword({ phoneNumber, newPassword }))
        .unwrap()
        .then(() => {
          toast.success("Thay đổi mật khẩu thành công", {
            position: "bottom-left"
          });

          reset();
          setOpen(false);
        })
        .catch((error) => {
          toast.error(error.messages, { position: "bottom-left" });
        });
    } else {
      setErrorText("Xác nhận mật khẩu ko trùng");
    }
  };

  return (
    <Box
      className={classes.formBox}
      component="form"
      onSubmit={handleSubmit(onSubmitChangePassword)}
    >
      <Grid container flexDirection="column" rowSpacing=  {2}>
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
      {/* {errorText && <Typography sx={{ color: "red" }}>{errorText}</Typography>} */}
      <Box sx={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          onClick={handleSubmit(onSubmitChangePassword)}
          variant="contained"
          disabled={loading.forgetPassword}
        >
          {loading.forgetPassword ? "Đang Đăng ký" : " Đăng ký"}
        </Button>
      </Box>
    </Box>
  );
};

export default Step3ChangePassword;
