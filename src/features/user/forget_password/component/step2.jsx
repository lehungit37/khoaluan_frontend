import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import style from "./style";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";

const useStyles = makeStyles(style);
const schema = yup
  .object({
    code: yup.string().required("Vui lòng nhập mã xác nhận")
  })
  .required();

const Step2ChangePassword = props => {
  const { handleNext } = props;

  const classes = useStyles();

  const { control, reset, handleSubmit, formState: {} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: ""
    }
  });

  const onSubmitPhoneNumber = data => {
    console.log(data);
    handleNext();
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

      <Box sx={{ textAlign: "center", marginTop: "15px" }}>
        <Button onClick={handleSubmit(onSubmitPhoneNumber)} variant="contained">
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
};

export default Step2ChangePassword;
