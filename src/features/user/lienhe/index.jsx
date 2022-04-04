import React from "react";
import { Box, Paper, Typography, Button, Grid, Link, Step, Stepper,StepLabel, TextareaAutosize } from "@mui/material";
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
 
 
 
});
const steps = ['Nhập số điện thoại', 'Xác thực '];
const useStyles = makeStyles(style);
function LienHe() {
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
    defaultValues: { userName:"",phoneNumber:"" }
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        toast.success("Đăng nhập thành công", {
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
    <Box sx={{padding:"15px 10%"}}>
    <Typography variant="h4">Liên hệ với chúng tôi</Typography>
    <Grid style={{paddingTop:"20px"}} container spacing={2}>
    <Grid style={{backgroundColor:"transparent",backgroundImage:"linear-gradient(145deg,#0039e4 0,#04dbf1 100%)",borderRadius:"50px",color:"white",}} item xs={6}>
      <Box>
      <Typography variant="h6">Thông tin liên hệ</Typography>
      <Typography variant="subtitle1">Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn FastRoom</Typography>
      <Typography variant="subtitle1">Số điện thoại:</Typography>
      <Typography variant="subtitle1">Email: </Typography>
      <Typography variant="subtitle1">Zalo: </Typography>
      <Typography variant="subtitle1">Địa chỉ: </Typography>
      </Box>
      </Grid>
      <Grid item xs={6}>
      <Grid item md={8} className={classes.formItem}>
        {/* <Paper className={classes.paper}>Đăng nhập</Paper> */}
        <Box
          className={classes.formBox}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h6">Liên hệ trực tuyến</Typography>
          <FormTextField
            control={control}
            name={"userName"}
            label="Họ và tên của bạn"
            size="small"
          />
          <FormTextField
            control={control}
            name={"phoneNumber"}
            label="Số điện thoại"
            size="small"
          />
          <TextareaAutosize
          // aria-label="minimum height"
          minRows={3}
          placeholder="  Nội dung"
          style={{ width:"100%",backgroundColor:"#f8f8f8"}}
          />
          <Box display={"flex"} justifyContent="center">
            <LoadingButton
              variant="contained"
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
              loading={status === "pending"}
              type="submit"
            >
              Gửi Liên Hệ
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
      </Grid>
    </Grid>
    </Box>
    </>
  );
}

export default LienHe;
