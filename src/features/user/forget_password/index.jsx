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
import SendIcon from "@mui/icons-material/Send";
import style from "./style";
import FormTextField from "../../../custom_fileds/hook-form/text_field";
import { login } from "../../../app/user_slice";
import color from "../../../constant/color";

const schema = yup.object({
  Email: yup.string().required("Vui lòng nhập Email"),
});

const useStyles = makeStyles(style);

function ForgetPass() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    defaultValues: { Email: "" },
  });

  // const [state, setState] = useState("Taif");
  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        toast.success("Đổi mật khẩu thành công", {
          position: "bottom-left",
          autoClose: 2000,
        });
        Cookies.set("token", res.token);
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

  // const exFuc = () => {
  //   alert("ĐÃ click");
  // };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          paddingTop: "1rem",
          fontWeight: "bold",
          color: "red",
        }}
        variant="h5"
      >
        QUÊN MẬT KHẨU
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "3%" }}
      >
        <Grid item md={7} className={classes.formItem}>
          {/* <Paper className={classes.paper}>Đăng nhập</Paper> */}

          <Box
            className={classes.formBox}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography>
              Vui lòng nhập số điện thoại liên kết với tài khoản của bạn để nhận
              mã đặt lại mật khẩu
            </Typography>
            <Typography>EMAIL</Typography>
            <FormTextField
              control={control}
              name={"Email"}
              label="Nhập Email"
              size="small"
            />

            <Box display={"flex"} justifyContent="center">
              <LoadingButton
                variant="contained"
                onSubmit={handleSubmit(onSubmit)}
                onClick={handleSubmit(onSubmit)}
                loading={status === "pending"}
                type="submit"
                endIcon={<SendIcon />}
              >
                Tiếp tục
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        {/* <J setState={setState} exFuc={exFuc} />
        {state} */}
      </Grid>
    </>
  );
}

export default ForgetPass;
