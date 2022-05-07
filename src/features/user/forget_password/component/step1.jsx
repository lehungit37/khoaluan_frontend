import React from "react";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import style from "./style";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import { useDispatch, useSelector } from "react-redux";
import { sendCode, setPhoneNumber } from "./../../../../app/user_slice";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

const useStyles = makeStyles(style);
const schema = yup
  .object({
    phoneNumber: yup
      .string()

      .length(10, "Định dạng số điện thoại không đúng")

      .matches(
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        "Định dạng số điện thoại không đúng"
      )
      .required("Vui lòng nhập số điện thoại")
  })
  .required();

const Step1ChangePassword = (props) => {
  const { handleNext } = props;
  const { loading } = useSelector((state) => state.userReducer);
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
      phoneNumber: ""
    }
  });

  const onSubmitPhoneNumber = (data) => {
    const { phoneNumber } = data;
    dispatch(sendCode(phoneNumber))
      .unwrap()
      .then(() => {
        dispatch(setPhoneNumber(phoneNumber));
        handleNext();
      })
      .catch((error) => {
        toast.error(error?.messages, { position: "bottom-left" });
      });
  };

  return (
    <Box
      className={classes.formBox}
      component="form"
      onSubmit={handleSubmit(onSubmitPhoneNumber)}
    >
      <FormTextField
        control={control}
        name={"phoneNumber"}
        label="Số điện thoại"
        size="small"
      />

      <Box sx={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          disabled={loading.sendCode}
          onClick={handleSubmit(onSubmitPhoneNumber)}
          variant="contained"
        >
          {loading.sendCode ? "...Đang gửi" : " Xác nhận"}
        </Button>
      </Box>
    </Box>
  );
};

export default Step1ChangePassword;
