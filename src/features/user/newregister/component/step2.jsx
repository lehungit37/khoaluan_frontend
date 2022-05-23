import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import style from "./style";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import { useSelector, useDispatch } from "react-redux";
import { sendCodeNotHasPhoneNumber, veryfy } from "../../../../app/user_slice";
import { toast } from "react-toastify";

const useStyles = makeStyles(style);
const schema = yup
  .object({
    code: yup.string().required("Vui lòng nhập mã xác nhận")
  })
  .required();

const Step2ChangePassword = (props) => {
  const { handleNext } = props;
  const { phoneNumber, loading, hash } = useSelector(
    (state) => state.userReducer
  );
  const [textNotifyOPT, setTextNotifyOTP] = useState("");
  const [timerCount, setTimerCount] = useState(2);
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: ""
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTextNotifyOTP(`Mã xác thực sẽ hết hạn sau ${timerCount} giây`);
      setTimerCount((prevState) => prevState - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerCount]);
  const onSubmitPhoneNumber = (data) => {
    const { code } = data;
    dispatch(veryfy({ phoneNumber, code, hash }))
      .unwrap()
      .then(() => {
        handleNext();
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  const handleResendOTP = () => {
    dispatch(sendCodeNotHasPhoneNumber(phoneNumber))
      .unwrap()
      .then(() => {
        setTimerCount(60);
      });
  };

  return (
    <>
      <Box
        className={classes.formBox}
        component="form"
        onSubmit={handleSubmit(onSubmitPhoneNumber)}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ margin: "10px 0px" }}>
            XÁC NHẬN OTP
          </Typography>
          <Typography subtitle="h2" component="h2" sx={{ margin: "10px 0px" }}>
            Mã xác nhận được gửi về thuê bao:
          </Typography>

          <Grid container alignItems={"center"} columnSpacing={1}>
            <Grid item md={4}>
              <Typography>Mã xác nhận</Typography>
            </Grid>
            <Grid item md={8}>
              <FormTextField control={control} name={"code"} size="small" />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", marginTop: "15px" }}>
          <Button
            disabled={loading.veryfy}
            onClick={handleSubmit(onSubmitPhoneNumber)}
            variant="contained"
          >
            {loading.veryfy ? "Đang xác thực" : "Xác nhận"}
          </Button>
        </Box>
      </Box>
      {timerCount >= 0 && timerCount <= 60 && textNotifyOPT ? (
        <Typography sx={{ color: "red" }}>{textNotifyOPT}</Typography>
      ) : (
        <Link component="button" variant="body2" onClick={handleResendOTP}>
          Lấy lại mã
        </Link>
      )}
    </>
  );
};

export default Step2ChangePassword;
