import React, { useMemo } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./style";
import { closeModal } from "../../../../app/modal_slice";

import qs from "query-string";
import { toast } from "react-toastify";
import {
  resetInfoEdit,
  updatePermission
} from "../../../../app/permission_slice";

const useStyles = makeStyles(style);

const schema = yup.object({
  namePermission: yup.string().required("Vui lòng nhập tên quyền")
});
const UpdatePermission = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { open } = useSelector((state) => state.modalReducer);
  const { infoEdit, loading } = useSelector((state) => state.permissionReducer);
  const defaultValues = useMemo(() => infoEdit, [infoEdit]);
  const {
    control,
    reset,
    handleSubmit,
    formState: {}
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(resetInfoEdit());
  };

  const onSubmit = (value) => {
    dispatch(updatePermission({ id: infoEdit?.id, data: value }))
      .unwrap()
      .then(() => {
        toast.success("Cập nhật thành công", { position: "bottom-left" });
        handleClose();
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={classes.boxModal}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography textAlign="center">Quản lý quyền</Typography>
        <Box sx={{ margin: "10px 0px" }}>
          <FormTextField
            control={control}
            name={"namePermission"}
            label="Tên quyền"
            size="small"
            disabled={false}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            disabled={loading.update}
            onClick={handleSubmit(onSubmit)}
            variant="contained"
          >
            {loading.upate ? "Đang thực hiện" : "Cập nhật"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdatePermission;
