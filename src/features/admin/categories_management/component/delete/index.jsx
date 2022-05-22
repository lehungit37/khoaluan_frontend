import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../../app/modal_slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box
} from "@mui/material";
import qs from "query-string";
import { LoadingButton } from "@mui/lab";
import WarningIcon from "@mui/icons-material/Warning";
import { deleteCategory, getData } from "../../category_slice";

const DeleteCategoryModal = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modalReducer);
  const { limit, page, loading } = useSelector(
    (state) => state.categoryReducer
  );
  const handleAcceptDeletePost = () => {
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        toast.success("Xóa danh mục thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
        const param = qs.stringify({ page, limit });

        dispatch(getData(param));

        dispatch(closeModal());
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <WarningIcon color="error" sx={{ fontSize: "50px" }} />
            <Typography>Bạn có muốn xóa danh mục không</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Hủy
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleAcceptDeletePost}
            autoFocus
          >
            {loading.delete ? "Đang xóa" : "Đồng ý"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCategoryModal;
