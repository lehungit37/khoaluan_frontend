import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Link,
  Step,
  Stepper,
  StepLabel,
  Modal,
  CircularProgress,
  Icon
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "./style";
import FormTextField from "./../../../../custom_fileds/hook-form/text_field/index";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useHistory } from "react-router-dom";
import { forgetPassword } from "../../../../app/user_slice";

const useStyles = makeStyles(style);

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .required()
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        "Định dạng số điện thoại không đúng"
      )
      .length(10, "Định dạng số điện thoại không đúng")
      .required("Vui lòng nhập số điện thoại")
  })
  .required();

const steps = ["Nhập SDT", "Xác thực ", "Thay đổi mật khẩu"];

export default function ModalForgetPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const { loading, rejected } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { open, setOpen } = props;
  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: ""
    }
  });
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [errorMessages, setErrorMessages] = useState("");
  const [myPhone, setMyPhone] = useState("");

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmitPhoneNumber = (data) => {
    handleNext();
    
  };

  const renderModalStep = () => {
    if (activeStep === 0) return renderStep1();
    else if (activeStep === 1) return renderStep2();
    return renderStep3();
  };

  //step 1: send phone Number
  const renderStep1 = () => {
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
            onClick={handleSubmit(onSubmitPhoneNumber)}
            variant="contained"
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    );
  };

  //step 2: confirm code,
  const renderStep2 = () => {};

  //step 3: change Password
  const renderStep3 = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Icon color="error" sx={{ width: "70px", height: "70px" }}>
          <CancelOutlinedIcon sx={{ width: "100%", height: "100%" }} />
        </Icon>

        <Typography textAlign="center" variant="h6" sx={{ margin: "15px 0px" }}>
          {errorMessages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            handleReset();
          }}
        >
          Quay lại
        </Button>
      </Box>
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.boxModal}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <React.Fragment>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ paddingTop: "0%", marginTop: "15px" }}
            >
              <Grid item className={classes.formItem}>
                {renderModalStep()}
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {activeStep !== 0 && (
                <Button color="inherit" onClick={handleBack}>
                  Back
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Modal>
    </div>
  );
}
