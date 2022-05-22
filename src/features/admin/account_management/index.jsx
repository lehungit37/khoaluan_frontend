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
import { getAllUser, unlockUser } from "../../../app/user_slice";
import queryString from "query-string";
import { lockUser } from "./../../../app/user_slice";

const useStyles = makeStyles();
function ManagementAccount() {
  const classes = useStyles();
  const token = Cookies.get("token");
  const history = useHistory();
  const {
    api: {
      getInfo: { me }
    },
    userList,
    totalData,
    limit,
    page,
    loading
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = { page, limit };
    const param = queryString.stringify(query);

    if (me.id) {
      dispatch(getAllUser(param));
    }
  }, [page, limit, me]);

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
      accessor: "imageUrl",
      disableFilter: false,
      align: "left",
      width: "auto",
      width: 100
    },
    {
      Header: "Tên người dùng",
      Footer: "Tên người dùng",
      accessor: "name",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Email",
      Footer: "Email",
      accessor: "email",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Số điện thoại",
      Footer: "Số điện thoại",
      accessor: "phoneNumber",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Quyền ",
      Footer: "Quyền ",
      accessor: "permission",
      disableFilter: false,
      align: "left",
      width: "auto"
    },

    {
      Header: "Trạng thái",
      Footer: "Trạng thái",
      accessor: "isLock",
      disableFilter: true,
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

  const handleLockUser = (id) => {
    dispatch(lockUser({ id }))
      .unwrap()
      .then(() => {
        toast.success("Khóa tài khoản thành công", { position: "bottom-left" });
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  const handleUnlockUser = (id) => {
    dispatch(unlockUser({ id }))
      .unwrap()
      .then(() => {
        toast.success("Mở khóa tài khoản thành công", {
          position: "bottom-left"
        });
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  const handleChangePage = (page) => {
    console.log(page);
  };

  const handleGetInfoEdit = (account) => {};
  const tableData = userList?.map((account, index) => {
    return {
      index: index + 1,
      imageUrl: <img style={{ width: "100%" }} src={account.imageUrl} />,
      name: account.name,
      email: account.email,
      phoneNumber: account.phoneNumber,
      isLock: (
        <Typography>
          {!account.isLock ? "Đang hoạt động" : "Bị khóa"}
        </Typography>
      ),
      permission: account.permission,
      action: (
        <Box>
          {account.isLock ? (
            <>
              <Tooltip title="Mở khóa" arrow placement="top-start">
                <IconButton
                  disabled={account.isDefault}
                  onClick={() => {
                    handleUnlockUser(account.id);
                  }}
                  // disabled={loading.hiddenPost}
                >
                  <LockOutlinedIcon color="success" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Khóa tài khoản" arrow placement="top-start">
                <IconButton
                  onClick={() => {
                    handleLockUser(account.id);
                  }}
                >
                  <LockOpenIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* <Tooltip title="Sửa tài khoản" arrow placement="top-start">
            <IconButton
              onClick={() => {
                handleGetInfoEdit(account);
              }}
            >
              <ModeEditOutlineIcon color="success" />
            </IconButton>
          </Tooltip> */}
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
        totalPage={Math.ceil(totalData / limit)}
        handleChangePageTable={handleChangePage}
        isShowPagination={true}
        isShowFilter={false}
        hideCheckbox={true}
        totalData={totalData}
        size="small"
        height="100vh"
        loading={loading.getAll}
      />
    </>
  );
}

export default ManagementAccount;
