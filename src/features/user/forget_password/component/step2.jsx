import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import style from "./style";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import { useSelector, useDispatch } from "react-redux";
import { veryfy } from "../../../../app/user_slice";

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
  const [errorText, setErrorText] = useState("");
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
    const timer = setTimeout(() => {
      setErrorText("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmitPhoneNumber = (data) => {
    const { code } = data;
    dispatch(veryfy({ phoneNumber, code, hash }))
      .unwrap()
      .then(() => {
        handleNext();
      })
      .catch((error) => {
        setErrorText(error.messages);
      });
  };

  return (
    <Box
      className={classes.formBox}
      component="form"
      onSubmit={handleSubmit(onSubmitPhoneNumber)}
    >
      <Grid container>
        <Grid item md={4}>
          <Typography>Mã xác nhận</Typography>
        </Grid>
        <Grid item md={8}>
          <FormTextField control={control} name={"code"} size="small" />
        </Grid>
      </Grid>

      <Box>{errorText && <Typography>{errorText}</Typography>}</Box>

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
  );
};

export default Step2ChangePassword;
