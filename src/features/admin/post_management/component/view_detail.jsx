import React from "react";
import { deletePostAdmin } from "../../../../app/post_slice";
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
  Box,
  Grid,
  Modal,
  Stack
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import WarningIcon from "@mui/icons-material/Warning";
import { resetInfoEdit } from "../../../../app/permission_slice";
import style from "./style";
import { makeStyles } from "@mui/styles";
import { customMoney } from "../../../../utils/helper";
import moment from "moment";

const useStyles = makeStyles(style);

const ModalViewDetail = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { open } = useSelector((state) => state.modalReducer);
  const { loading, infoDetailPost } = useSelector((state) => state.postReducer);
  const handleAcceptDeletePost = () => {
    dispatch(deletePostAdmin(id))
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
    dispatch(resetInfoEdit());
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className={classes.boxModal}>
          <Typography variant="h5" textAlign="center">
            THÔNG TIN BÀI VIẾT
          </Typography>
          <Stack rowGap={2} marginTop={1}>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Tiêu đề
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">{infoDetailPost?.title}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Mô tả
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {infoDetailPost?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Giá
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {`${customMoney(infoDetailPost?.price)} / Tháng`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Địa chỉ
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {infoDetailPost?.address}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Tọa độ
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {infoDetailPost?.rootLocation}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Thông tin liên hệ
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {infoDetailPost?.infoConnect}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Tên người đăng
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">{infoDetailPost?.name}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Thời gian tạo
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {moment(infoDetailPost?.createdAt).format("LT l")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Trạng thái
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">
                    {infoDetailPost?.status ? "Đang hiển thị" : "Đã ẩn"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalViewDetail;
