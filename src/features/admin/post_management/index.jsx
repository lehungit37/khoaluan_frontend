import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userToken } from "../../../api/axios_client";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Cookies from "js-cookie";
import Loading from "../../../components/loading";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import moment from "moment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LoadingButton from "@mui/lab/LoadingButton";
import MainTable from "../../../custom_fileds/table/MainTable";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AccountTree } from "@mui/icons-material";
import { customMoney } from "../../../utils/helper";
import { openModal } from "../../../app/modal_slice";
import DeleteModal from "./component/delete_modal";

const useStyles = makeStyles();
function ManagementAccount() {
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

  const datafetch = [
    {
      id: "1",
      imagePost:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/3-8.png",
      title: "Huy",
      price: 20000,
      phoneNumber: "0905705567",
      status: true,
      permission: "admin"
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

  const tableData = datafetch?.map((posts, index) => {
    return {
      index: index + 1,
      imagePost: <img style={{ width: "100%" }} src={posts.imagePost} />,
      title: posts.title,
      price: <Typography>{customMoney(posts.price)}/Tháng</Typography>,
      updatedAt: moment(posts.updatedAt).fromNow(),
      status: posts.status ? "Đang hiển thị" : "Đã ẩn",
      action: (
        <Box>
          {posts.status ? (
            <>
              <Tooltip title="Khóa bài viết" arrow placement="top-start">
                <IconButton
                // disabled={loading.hiddenPost}
                >
                  <LockOutlinedIcon color="success" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Mở khóa bài viết" arrow placement="top-start">
                <IconButton>
                  <LockOpenIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Xem thông tin bài viết" arrow placement="top-start">
            <IconButton>
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
        limit={10}
        page={1}
        totalPage={10}
        // handleChangePageTable={handleChangePage}
        isShowPagination={true}
        isShowFilter={false}
        hideCheckbox={true}
        totalData={10}
        size="small"
        height="100vh"
        //   loading={loading.getPostByUser}
      />
    </>
  );
}

export default ManagementAccount;
