import React, { useMemo } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormTextField from "./../../../../../custom_fileds/hook-form/text_field/index";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./style";
import { closeModal } from "../../../../../app/modal_slice";
import {
  addCategory,
  resetValueEditCategory,
  updateCategory
} from "./../../category_slice";
import { toast } from "react-toastify";

const useStyles = makeStyles(style);

const schema = yup.object({
  nameCategories: yup.string().required("Vui lòng nhập tên danh mục")
});
const AddUpdateCategory = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { open } = useSelector((state) => state.modalReducer);
  const { infoEdit, loading } = useSelector((state) => state.categoryReducer);
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
    dispatch(resetValueEditCategory());
  };

  const onSubmit = (value) => {
    for (const key in value) {
      if (key === "id") delete value[key];
    }
    if (!infoEdit.id) {
      dispatch(addCategory(value))
        .then(() => {
          toast.success("Thêm danh mục thành công", {
            position: "bottom-left"
          });
          reset();
          dispatch(closeModal());
        })
        .catch((error) => {
          toast.error(error.messages, { position: "bottom-left" });
        });
    } else {
      dispatch(
        updateCategory({
          id: infoEdit.id,
          nameCategories: value.nameCategories
        })
      )
        .unwrap()
        .then(() => {
          reset();
          dispatch(closeModal());
          toast.success("Sửa danh mục thành công", { position: "bottom-left" });
        })
        .catch((error) => {
          toast.error(error.messages, { position: "bottom-left" });
        });
    }
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
        <Typography textAlign="center">Quản lý danh mục</Typography>
        <Box sx={{ margin: "10px 0px" }}>
          <FormTextField
            control={control}
            name={"nameCategories"}
            label="Tên danh mục"
            size="small"
            disabled={false}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {loading.upate || loading.add
              ? "Đang thực hiện"
              : infoEdit.id
              ? "Cập nhật"
              : "Thêm mới"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUpdateCategory;
