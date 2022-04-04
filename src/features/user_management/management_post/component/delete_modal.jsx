import React from "react";
import { deletePost } from "../../../../app/post_slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../app/modal_slice";
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
import { LoadingButton } from "@mui/lab";
import WarningIcon from "@mui/icons-material/Warning";

const DeleteModal = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modalReducer);
  const { loading } = useSelector((state) => state.postReducer);
  const handleAcceptDeletePost = () => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        toast.success("Xóa bài viết thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
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
            <Typography>Bạn có muốn xóa bài viết không</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Hủy
          </Button>
          <LoadingButton
            loading={loading.deletePost}
            variant="contained"
            color="error"
            onClick={handleAcceptDeletePost}
            autoFocus
          >
            Đồng ý
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
