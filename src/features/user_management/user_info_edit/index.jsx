import React from "react";
import { Box, Paper, Typography, Button, Grid, Link,IconButton, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material"; 
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles, styled } from "@mui/styles";
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
  id: yup.string(),
  // password: yup.string().required("Vui lòng nhập mật khẩu")
 
});

const useStyles = makeStyles(style);
function UserInfoEdit() {
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
    defaultValues: { id: "", phoneNumber: "", name:"",email:"",facebook:"",password:"",imgUrl:"", }
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
  const Input = styled('input')({
    display: 'none',
  });
  

  return (
    <>
   <Box className = {classes.header}> <Typography variant="h5" >Cập nhập thông tin cá nhân</Typography></Box>

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
            name={"id"}
            label="id"
            size="small"
            disabled={true}
          />
          <Box>
          <FormTextField
            control={control}
            name={"phoneNumber"}
            label="Số điện thoại"
            size="small"
          />
          <Button
              onClick={() => {
                history.push("/quan-ly/doi-so-dien-thoai");
              }}
            >
              đổi số điện thoại
            </Button>
          </Box>

          <FormTextField
            control={control}
            name={"name"}
            label="Tên hiển thị"
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
            name={"phoneNumber"}
            label="Số Zalo"
            size="small"
          />
          <FormTextField
            control={control}
            name={"facebook"}
            label="Facebook"
            size="small"
          />
         <Button
              onClick={() => {
                history.push("/quan-ly/doi-mat-khau");
              }}
            >
              đổi mật khẩu 
            </Button>
        <Box sx={{display:"flex", justifyContent:"center"}}>

        <Box sx={{  borderRadius:"100%",overflow:"hidden",height: "150px", width: "150px" }}>
         <img style={{width:"100%",height:"100%",}} src="https://pbs.twimg.com/profile_images/1483493069752258566/Ft0W9FvR_400x400.jpg" alt="" />
        </Box>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center"}}>
        <Box>
        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
        Upload
        </Button>
        </label>
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        {/* <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
        </IconButton> */}
        </label>
        </Box>
        </Box>

          <Box display={"flex"} justifyContent="center">
            <LoadingButton
              variant="contained"
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
              loading={status === "pending"}
              type="submit"
            >
              Lưu & cập nhật
            </LoadingButton>
          </Box>
        </Box>

        <Grid container justifyContent="space-between" marginTop={2}>
          <Grid item>
           
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default UserInfoEdit;
