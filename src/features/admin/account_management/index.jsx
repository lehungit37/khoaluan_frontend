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
      getInfo: { me },
    },
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const columnsTable = [
    {
      Header: "STT",
      Footer: "STT",
      accessor: "index",
      disableFilter: false,
      align: "left",
      width: 30,
    },
    {
      Header: "Ảnh đại diện",
      Footer: "Ảnh đại diện",
      accessor: "imageUrl",
      disableFilter: false,
      align: "left",
      width: "auto",
      width: 100,
    },
    {
      Header: "Tên người dùng",
      Footer: "Tên người dùng",
      accessor: "name",
      disableFilter: false,
      align: "left",
      width: "auto",
    },
    {
      Header: "Email",
      Footer: "Email",
      accessor: "email",
      disableFilter: false,
      align: "left",
      width: "auto",
    },
    {
      Header: "Số điện thoại",
      Footer: "Số điện thoại",
      accessor: "phoneNumber",
      disableFilter: false,
      align: "left",
      width: "auto",
    },
    {
      Header: "Trạng thái",
      Footer: "Trạng thái",
      accessor: "isLock",
      disableFilter: true,
      align: "left",
      width: "auto",
    },
    {
      Header: "Tùy chọn",
      Footer: "Tùy chọn",
      accessor: "action",
      disableFilter: false,
      align: "left",
      width: 150,
    },
  ];

  const datafetch = [
    {
      id: "1",
      imageUrl: "Hello",
      name: "Huy",
      email: "qinqin2109@gmail.com",
      phoneNumber: "0905705567",
      isLock: true,
      permission: "admin",
    },
    {
      id: "1",
      imageUrl: "Hello",
      name: "Huy",
      email: "qinqin2109@gmail.com",
      phoneNumber: "0905705567",
      isLock: true,
      permission: "admin",
    },
    {
      id: "1",
      imageUrl: "Hello",
      name: "Huy",
      email: "qinqin2109@gmail.com",
      phoneNumber: "0905705567",
      isLock: true,
      permission: "admin",
    },
  ];

  const tableData = datafetch?.map((account, index) => {
    return {
      index: index + 1,
      imageUrl: <img src={account.imageUrl} />,
      name: account.name,
      email: account.email,
      phoneNumber: account.phoneNumber,
      isLock: (
        <Typography>{account.isLock ? "Đang hoạt động" : "Bị khóa"}</Typography>
      ),
      permission: account.permission,
      action: (
        <Box>
          {account.status ? (
            <>
              <Tooltip title="Khóa tài khoản" arrow placement="top-start">
                <IconButton
                // disabled={loading.hiddenPost}
                >
                  <LockOutlinedIcon color="success" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Mở khóa" arrow placement="top-start">
                <IconButton>
                  <LockOpenIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Sửa tài khoản" arrow placement="top-start">
            <IconButton>
              <ModeEditOutlineIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa tài khoản" arrow placement="top-start">
            <IconButton>
              <DeleteOutlineOutlinedIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
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
        //   loading={loading.getPostByUser}
      />
    </>
  );
}

export default ManagementAccount;
