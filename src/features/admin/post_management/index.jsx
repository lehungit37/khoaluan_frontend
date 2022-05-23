import ClearIcon from "@mui/icons-material/Clear";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import moment from "moment";
import qs from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { openModal } from "../../../app/modal_slice";
import {
  changePagePost,
  getPostByAdmin,
  hiddenPost,
  hiddenPostAdmin,
  displayPostAdmin,
  getInfoDetailPost
} from "../../../app/post_slice";
import Loading from "../../../components/loading";
import MainTable from "../../../custom_fileds/table/MainTable";
import { customMoney } from "../../../utils/helper";
import DeleteModal from "./component/delete_modal";
import ModalViewDetail from "./component/view_detail";
import { toast } from "react-toastify";
const useStyles = makeStyles();
function ManagementAccount() {
  const { loading, totalDataAdmin, limit, page, postDataAdmin } = useSelector(
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

  useEffect(() => {
    if (me?.id) {
      dispatch(getPostByAdmin(qs.stringify({ limit, page })));
    }
  }, [me, page, limit]);

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

  const handleOpenModalDelete = (id) => {
    dispatch(
      openModal({
        dialogProps: { id },
        dialogType: DeleteModal
      })
    );
  };

  const hiddenPost = (post) => {
    dispatch(hiddenPostAdmin(post?.id))
      .unwrap()
      .then(() => {
        toast.success("Khóa bài viết thành công", { position: "bottom-left" });
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  const displayPost = (post) => {
    dispatch(displayPostAdmin(post.id))
      .unwrap()
      .then(() => {
        toast.success("Mở khóa bài viết thành công", {
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

  const handleViewDetailPost = (id) => {
    dispatch(getInfoDetailPost(id))
      .unwrap()
      .then(() => {
        dispatch(openModal({ dialogProps: {}, dialogType: ModalViewDetail }));
      });
  };

  const tableData = postDataAdmin?.map((posts, index) => {
    return {
      index: index + 1,
      imagePost: <img style={{ width: "100%" }} src={posts.imagePost} />,
      title: posts.title,
      price: <Typography>{customMoney(posts.price)}/Tháng</Typography>,
      updatedAt: moment(posts.updatedAt).fromNow(),
      status: posts.status ? "Đang hiển thị" : "Đã ẩn",
      action: (
        <Box>
          {!posts.status ? (
            <>
              <Tooltip title="Mở khóa bài viết" arrow placement="top-start">
                <IconButton
                  onClick={() => {
                    displayPost(posts);
                  }}
                  disabled={loading.hiddenPostAdmin}
                >
                  <LockOutlinedIcon color="success" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Khóa bài viết" arrow placement="top-start">
                <IconButton
                  onClick={() => {
                    hiddenPost(posts);
                  }}
                >
                  <LockOpenIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Xem thông tin bài viết" arrow placement="top-start">
            <IconButton
              onClick={() => {
                handleViewDetailPost(posts.id);
              }}
            >
              <RemoveRedEyeIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa bài" arrow placement="top-start">
            <IconButton onClick={() => handleOpenModalDelete(posts.id)}>
              <ClearIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    };
  });

  if (loading.getPostByUser) return <Loading />;
  return (
    <>
      <MainTable
        className={classes.table}
        tableData={tableData}
        column={columnsTable}
        limit={limit}
        page={page}
        totalPage={Math.ceil(totalDataAdmin / limit)}
        handleChangePageTable={handleChangePage}
        isShowPagination={true}
        isShowFilter={false}
        hideCheckbox={true}
        totalData={totalDataAdmin}
        size="small"
        height="100vh"
        loading={loading.getPostByAdmin}
      />
    </>
  );
}

export default ManagementAccount;
