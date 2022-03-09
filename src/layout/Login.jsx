import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { history } from "../App";

const Login = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        maxHeight: "100%",
        background:
          "url('https://wallpaperaccess.com/full/9794.jpg') center/cover"
      }}
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box
        sx={{
          background: "#fff",
          borderRadius: 1,
          width: 450,
          display: "flex",
          alignItems: "center",
          height: "100%",
          maxWidth: "100%",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          p: 3
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mb: 4 }}
            align="center"
            component="h1"
          >
            Đăng nhập
          </Typography>
          <FormControl size="small" fullWidth variant="outlined" margin="dense">
            <TextField size="small" label="Tên đăng nhập" />
          </FormControl>
          <FormControl size="small" fullWidth variant="outlined" margin="dense">
            <TextField size="small" label="Mật khẩu" />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            onClick={() => history.push("/")}
          >
            Đăng nhập
          </Button>

          <Stack direction="row" flexWrap="wrap">
            <Typography
              sx={{ flex: 1, minWidth: "120px" }}
              variant="subtitle1"
              align="left"
              component="p"
            >
              <Link to="/dang-ky">Quên mật khẩu</Link>
            </Typography>
            <Typography variant="subtitle1" align="right" component="p">
              Bạn chưa có tài khoản <Link to="/dang-ky"> Đăng ký</Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
