import React, { useState, useEffect } from "react";
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
  CircularProgress
} from "@mui/material";
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
import { login, veryfy } from "../../../app/user_slice";
import color from "../../../constant/color";
import { closeModal } from "../../../app/modal_slice";
import { sendCode, changePhoneNumber } from "./../../../app/user_slice";

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại cũ")
    .length(10, "Định dạng số điện thoại không đúng")

    .matches(
      /^[+]*[(]{0}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      "Định dạng số điện thoại không đúng"
    ),
  newPhoneNumber: yup
    .string()
    .required("vui lòng nhập số điện thoại mới")
    .length(10, "Định dạng số điện thoại không đúng")

    .matches(
      /^[+]*[(]{0}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      "Định dạng số điện thoại không đúng"
    )
});
const steps = ["Nhập số điện thoại", "Xác thực "];
const useStyles = makeStyles(style);
function ModalChangePhoneNumber() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [stringButoon, setStringButton] = useState("Tiếp theo");
  const dispatch = useDispatch();
  const {
    api: {
      auth: {
        login: { status }
      },
      getInfo: { me }
    },
    hash
  } = useSelector((state) => state.userReducer);

  const history = useHistory();
  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phoneNumber: me.phoneNumber }
  });

  const { open } = useSelector((state) => state.modalReducer);
  const [newPhone, setNewPhone] = useState("");

  const onSubmitFormPhone = (data) => {
    const { phoneNumber, newPhoneNumber } = data;
    setLoading(true);
    dispatch(sendCode(newPhoneNumber))
      .unwrap()
      .then(() => {
        handleNext();
        setLoading(false);
        setNewPhone(newPhoneNumber);
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
        setLoading(false);
      });
  };

  const onSubmitFormVeryfy = (data) => {
    const { newPhoneNumber, code } = data;
    setLoading(true);
    dispatch(veryfy({ phoneNumber: newPhoneNumber, code, hash }))
      .unwrap()
      .then(() => {
        dispatch(changePhoneNumber({ phoneNumber: newPhoneNumber, id: me.id }))
          .unwrap()
          .then(() => {
            toast.success("Cập nhật số điện thoại thành công", {
              position: "bottom-left"
            });
            dispatch(closeModal());
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.messages, { position: "bottom-left" });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.messages, { position: "bottom-left" });
        setLoading(false);
      });
  };

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

  const handleClose = () => {
    handleReset();
    dispatch(closeModal());
  };

  console.log(loading);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.boxModal}>
        <Grid
          container
          justifyContent={"center"}
          alignItems=" center"
          spacing={1}
        >
          <Grid item>
            <Box sx={{ width: "100%" }}>
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
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Bạn đã cập nhật thành công số điện thoại
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleClose}>Đóng</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ paddingTop: "0%" }}
                  >
                    <Grid
                      item
                      className={classes.formItem}
                      sx={{ width: "100%" }}
                    >
                      {activeStep === 0 ? (
                        <Box
                          className={classes.formBox}
                          component="form"
                          onSubmit={handleSubmit(onSubmitFormPhone)}
                        >
                          <Box sx={{ margin: "20px 0px", width: "100%" }}>
                            <FormTextField
                              control={control}
                              name={"phoneNumber"}
                              label="Số điện thoại cũ"
                              size="small"
                              disabled={true}
                            />
                          </Box>

                          <Box sx={{ width: "100%" }}>
                            <FormTextField
                              control={control}
                              name={"newPhoneNumber"}
                              label="Số điện thoại mới"
                              size="small"
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          component="form"
                          onSubmit={handleSubmit(onSubmitFormVeryfy)}
                          sx={{ width: "100%", marginTop: "10px" }}
                        >
                          <FormTextField
                            control={control}
                            name={"code"}
                            label="Mã xác thực"
                            size="small"
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                    <Button
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit(onSubmitFormVeryfy)
                          : handleSubmit(onSubmitFormPhone)
                      }
                      disabled={loading}
                      variant="contained"
                    >
                      {loading && <CircularProgress size={15} />}
                      {activeStep === steps.length - 1
                        ? "Cập nhật"
                        : "Tiếp theo"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalChangePhoneNumber;
