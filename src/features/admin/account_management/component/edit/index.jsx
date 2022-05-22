import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "../../../../app/modal_slice";
import style from "./style";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextField from "./../../../../custom_fileds/hook-form/text_field/index";

import { changePassword } from "../../../../app/user_slice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
const useStyles = makeStyles(style);

const schema = yup
  .object({
    currentPassword: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("Vui lòng nhập mật khâu mới")
  })
  .required();

const ButtonCom = ({ title, loading, onClick, variant }) => {
  return (
    <Button variant={variant ? variant : "contained"} onClick={onClick}>
      {loading ? (
        <>
          <CircularProgress
            size={15}
            sx={{
              color: "#fff",
              mr: 1
            }}
          />
          {title}
        </>
      ) : (
        title
      )}
    </Button>
  );
};

const ModalEditPermissionUser = () => {
  const { open } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    }
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(changePassword(data))
      .unwrap()
      .then(() => {
        setLoading(false);
        handleClose();
        toast.success("Cập nhật mật khẩu thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.boxModal}>
        <Typography
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Thay đổi mật khẩu
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 3,
            marginTop: "10px"
          }}
        >
          <FormTextField
            control={control}
            label="Mật khẩu cũ"
            name="currentPassword"
            size="small"
            type="password"
          />
          <FormTextField
            control={control}
            label="Mật khẩu mới"
            name="newPassword"
            size="small"
            type="password"
          />
          <Box display="flex" justifyContent="center">
            <LoadingButton
              loading={loading}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Cập nhật
            </LoadingButton>
            {/* <ButtonCom
              loading={loading}
              title="Cập nhật"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            /> */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditPermissionUser;
