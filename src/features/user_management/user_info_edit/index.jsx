import React, { useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Link,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
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
import { changeAvatar, login } from "../../../app/user_slice";
import color from "../../../constant/color";
import { openModal } from "../../../app/modal_slice";
import ModalChangePassword from "./component/modal_change_password";
import { uploadSimpleImage } from "../../../app/image";
import { updateUser } from "./../../../app/user_slice";

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập tên hiển thị"),
});

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles(style);
function UserInfoEdit() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    api: {
      auth: {
        login: { status },
      },
      getInfo: { me },
    },
    loading,
  } = useSelector((state) => state.userReducer);

  const defaultValues = useMemo(() => me, [me]);
  const history = useHistory();
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (data) => {
    dispatch(updateUser({ user: data, id: me.id }))
      .unwrap()
      .then(() => {
        toast.success("Cập nhật thông tin thành công", {
          position: "bottom-left",
          autoClose: 2000,
        });
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
  const Input = styled("input")({
    display: "none",
  });

  const handleOpenModalChangePassword = () => {
    dispatch(
      openModal({
        dialogProps: {},
        dialogType: ModalChangePassword,
      })
    );
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    dispatch(uploadSimpleImage(formData))
      .unwrap()
      .then((data) => {
        const imageUrl = data.url;

        dispatch(changeAvatar(imageUrl))
          .unwrap()
          .then(() => {
            toast.success("Cập nhật ảnh thành công", {
              position: "bottom-left",
              autoClose: 2000,
            });
          })
          .catch((error) => {
            toast.error(error.messages, {
              position: "bottom-left",
              autoClose: 2000,
            });
          });
      })
      .catch((error) => {
        toast.error("Cập nhật ảnh thất bại", {
          position: "bottom-left",
          autoClose: 2000,
        });
      });
  };

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h5">Hồ sơ của tôi</Typography>
        <Typography variant="p">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>
      </Box>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        padding={"20px 0px"}
        sx={{
          "@media(max-width:768px)": {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Grid item md={9}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}
          >
            <Grid container columnSpacing={3}>
              <Grid item md={3}>
                <Typography align="right">Tên đăng nhập</Typography>
              </Grid>
              <Grid item md={9}>
                <Typography>{me.userName}</Typography>
              </Grid>
            </Grid>
            <Grid container columnSpacing={3}>
              <Grid item md={3}>
                <Typography align="right">Mật khẩu</Typography>
              </Grid>
              <Grid item md={9}>
                <Button
                  onClick={handleOpenModalChangePassword}
                  variant="contained"
                >
                  Thay đổi mật khẩu
                </Button>
              </Grid>
            </Grid>
            <Grid container columnSpacing={3}>
              <Grid item md={3}>
                <Typography align="right">Email</Typography>
              </Grid>
              <Grid item md={9}>
                <Typography>{me?.email}</Typography>
              </Grid>
            </Grid>

            <Grid container columnSpacing={3}>
              <Grid item md={3}>
                <Typography align="right">Số điện thoại</Typography>
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">{me?.phoneNumber}</Typography>
                <Button variant="contained">Thay đổi số điện thoại</Button>
              </Grid>
            </Grid>
            <Grid container columnSpacing={3}>
              <Grid item md={3}>
                <Typography align="right"> Tên hiển thị</Typography>
              </Grid>
              <Grid item md={9}>
                <FormTextField
                  size="small"
                  control={control}
                  label=""
                  name="name"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={me?.imageUrl}
              sx={{ width: "150px", height: "150px" }}
            />
          </Box>
          <label htmlFor="contained-button-file">
            <Input
              onChange={handleChangeAvatar}
              accept="image/*"
              id="contained-button-file"
              type="file"
            />
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                sx={{ margin: "0 auto", textAlign: "center" }}
                variant="contained"
                component="span"
              >
                Chọn ảnh
              </Button>
            </Box>
          </label>
        </Grid>
        <Grid
          container
          sx={{ width: "100%", padding: "2rem 0" }}
          justifyContent="center"
        >
          <Grid item>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              color="success"
              variant="contained"
              disabled={!isDirty}
              loading={loading.updateUser}
            >
              Lưu thay đổi
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserInfoEdit;
