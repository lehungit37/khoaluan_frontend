import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userToken } from "../../../api/axios_client";
import {
  displayPost,
  getPostByUser,
  hiddenPost,
  changePagePost
} from "../../../app/post_slice";
import Cookies from "js-cookie";
import Loading from "../../../components/loading";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
import { customMoney } from "../../../utils/helper";
import moment from "moment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LoadingButton from "@mui/lab/LoadingButton";
import MainTable from "../../../custom_fileds/table/MainTable";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { deletePost } from "./../../../app/post_slice";
import { openModal } from "../../../app/modal_slice";
import DeleteModal from "./component/delete_modal";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const useStyles = makeStyles();
function ManagementPost() {
  const { loading, postData, totalData, limit, page } = useSelector(
    (state) => state.postReducer
  );
  const classes = useStyles();
  const token = Cookies.get("token");
  const history = useHistory();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleDisplayPost = (id) => {
    dispatch(displayPost(id))
      .unwrap()
      .then(() => {
        toast.success("Hiển thị bài viết thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };
  const handleHiddenPost = (id) => {
    dispatch(hiddenPost(id))
      .unwrap()
      .then(() => {
        toast.success("Ẩn bài viết thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };

  const handleOpenModalDelete = (id) => {
    dispatch(
      openModal({
        dialogProps: { id },
        dialogType: DeleteModal
      })
    );
  };

  const handleChangePage = (value) => {
    dispatch(changePagePost(value));
  };
  const columnsTable = [
    {
      Header: "STT",
      Footer: "STT",
      accessor: "index",
      disableFilter: false,
      align: "left",
      width: 30
    },
    {
      Header: "Ảnh đại diện",
      Footer: "Ảnh đại diện",
      accessor: "imagePost",
      disableFilter: false,
      align: "left",
      width: "auto",
      width: 100
    },
    {
      Header: "Tiêu đề",
      Footer: "Tiêu đề",
      accessor: "title",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Giá",
      Footer: "Giá",
      accessor: "price",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Ngày đăng",
      Footer: "Ngày đăng",
      accessor: "updatedAt",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Trạng thái",
      Footer: "Trạng thái",
      accessor: "status",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Tùy chọn",
      Footer: "Tùy chọn",
      accessor: "action",
      disableFilter: false,
      align: "left",
      width: 150
    }
  ];

  const tableData = postData?.map((postItem, index) => {
    return {
      index: index + 1,
      imagePost: <img style={{ width: "100%" }} src={postItem.imagePost} />,
      title: postItem.title,
      price: <Typography>{customMoney(postItem.price)}/Tháng</Typography>,
      updatedAt: moment(postItem.updatedAt).fromNow(),
      status: postItem.status ? "Đang hiển thị" : "Đã ẩn",
      action: (
        <Box>
          {postItem.status ? (
            <>
              <Tooltip title="Ẩn bài" arrow placement="top-start">
                <IconButton
                  disabled={loading.hiddenPost}
                  onClick={() => handleHiddenPost(postItem.id)}
                >
                  <VisibilityOffIcon color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Chỉnh sửa" arrow placement="top-start">
                <IconButton
                  onClick={() =>
                    history.push(`/quan-ly/chinh-sua/${postItem.id}`)
                  }
                >
                  <ModeEditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Hiển thị bài" arrow placement="top-start">
                <IconButton onClick={() => handleDisplayPost(postItem.id)}>
                  <RemoveRedEyeIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Xóa bài" arrow placement="top-start">
            <IconButton onClick={() => handleOpenModalDelete(postItem.id)}>
              <ClearIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    };
  });

  useEffect(() => {
    if (me?.id && token) {
      dispatch(
        getPostByUser({ id: me.id, param: qs.stringify({ limit, page }) })
      );
    }
  }, [me]);

  if (loading.getPostByUser) return <Loading />;
  return (
    <MainTable
      className={classes.table}
      tableData={tableData}
      column={columnsTable}
      limit={postData.length <= limit ? postData.length : limit}
      page={page}
      totalPage={Math.ceil(totalData / limit)}
      handleChangePageTable={handleChangePage}
      isShowPagination={true}
      isShowFilter={false}
      hideCheckbox={true}
      totalData={totalData}
      size="small"
      loading={loading.getPostByUser}
    />
  );
}

export default ManagementPost;
