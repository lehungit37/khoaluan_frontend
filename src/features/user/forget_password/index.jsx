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
import FormTextField from "../../../custom_fileds/hook-form/text_field/index";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useHistory } from "react-router-dom";
import { forgetPassword } from "../../../app/user_slice";
import Step1ChangePassword from './component/step1'
import Step2ChangePassword from './component/step2'

const useStyles = makeStyles(style);


const steps = ["Nhập SDT", "Xác thực ", "Thay đổi mật khẩu"];

export default function ModalForgetPassword(props) {
    const classes = useStyles();
    const history = useHistory();
    const { loading, rejected } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { open, setOpen } = props;
 
    const handleClose = () => {
        setOpen(false);
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
        if (activeStep === 0) return <Step1ChangePassword handleNext= {handleNext}/>;
        else if (activeStep === 1) return <Step2ChangePassword handleNext = {handleNext}/>;
        return renderStep3();
    };


    //step 2: confirm code,
    const renderStep2 = () => {
        return (
            <Box>

            </Box>
        )
    };

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
