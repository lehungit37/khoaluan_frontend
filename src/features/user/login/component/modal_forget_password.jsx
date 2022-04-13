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
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Định dạng email không đúng"
      )
  })
  .required();

const steps = ["Nhập email", "Xác thực "];

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

  const onSubmit = (data) => {
    handleNext();
    dispatch(forgetPassword(data))
      .unwrap()
      .catch((error) => {
        setErrorMessages(error.messages);
      });
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
                {activeStep === 0 ? (
                  <Box
                    className={classes.formBox}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <FormTextField
                      control={control}
                      name={"email"}
                      label="Email"
                      size="small"
                    />

                    <Box sx={{ textAlign: "center", marginTop: "15px" }}>
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                      >
                        Xác nhận
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    {rejected.forgetPassword ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <Icon
                          color="error"
                          sx={{ width: "70px", height: "70px" }}
                        >
                          <CancelOutlinedIcon
                            sx={{ width: "100%", height: "100%" }}
                          />
                        </Icon>

                        <Typography
                          textAlign="center"
                          variant="h6"
                          sx={{ margin: "15px 0px" }}
                        >
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
                    ) : (
                      <>
                        {loading.forgetPassword ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center"
                            }}
                          >
                            <CircularProgress size={50} />

                            <Typography variant="h6" sx={{ marginTop: "15px" }}>
                              Đang gửi email...
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                              }}
                            >
                              <Icon
                                color="success"
                                sx={{ width: "70px", height: "70px" }}
                              >
                                <CheckCircleOutlineOutlinedIcon
                                  sx={{ width: "100%", height: "100%" }}
                                />
                              </Icon>

                              <Typography
                                variant="h6"
                                sx={{ margin: "15px 0px" }}
                              >
                                Email đã được gửi, vui lòng kiểm tra
                              </Typography>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  handleClose();
                                  history.push("/login");
                                  handleReset();
                                }}
                              >
                                Đăng nhập
                              </Button>
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
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
