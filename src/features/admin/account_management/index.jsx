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
import {
  changePage,
  getAllPermission,
  getAllUser,
  resetpage,
  unlockUser
} from "../../../app/user_slice";
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
    loading,
    permissionList
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = { page, limit };
    const param = queryString.stringify(query);

    if (me.id) {
      dispatch(getAllUser(param));
    }
  }, [page, limit, me]);
  useEffect(() => {
    dispatch(getAllPermission());
  }, []);

  const renderNamePermission = (id) => {
    const index = permissionList?.findIndex((item) => item.id == id);
    console.log(permissionList?.[index]?.namePermission);
    return permissionList[index]?.namePermission;
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
      Header: "???nh ?????i di???n",
      Footer: "???nh ?????i di???n",
      accessor: "imageUrl",
      disableFilter: false,
      align: "left",
      width: "auto",
      width: 75
    },
    {
      Header: "T??n ng?????i d??ng",
      Footer: "T??n ng?????i d??ng",
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
      Header: "S??? ??i???n tho???i",
      Footer: "S??? ??i???n tho???i",
      accessor: "phoneNumber",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Quy???n ",
      Footer: "Quy???n ",
      accessor: "permission",
      disableFilter: false,
      align: "left",
      width: "auto"
    },

    {
      Header: "Tr???ng th??i",
      Footer: "Tr???ng th??i",
      accessor: "isLock",
      disableFilter: true,
      align: "left",
      width: "auto"
    },
    {
      Header: "T??y ch???n",
      Footer: "T??y ch???n",
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
        toast.success("Kh??a t??i kho???n th??nh c??ng", { position: "bottom-left" });
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  const handleUnlockUser = (id) => {
    dispatch(unlockUser({ id }))
      .unwrap()
      .then(() => {
        toast.success("M??? kh??a t??i kho???n th??nh c??ng", {
          position: "bottom-left"
        });
      })
      .catch((error) => {
        toast.error(error.messages, { position: "bottom-left" });
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetpage());
    };
  }, []);

  const handleChangePage = (page) => {
    dispatch(changePage(page));
  };

  const tableData = userList?.map((account, index) => {
    return {
      index: index + 1,
      imageUrl: <img style={{ width: "100%" }} src={account.imageUrl} />,
      name: account.name,
      email: account.email,
      phoneNumber: account.phoneNumber,
      isLock: (
        <Typography>
          {!account.isLock ? "??ang ho???t ?????ng" : "B??? kh??a"}
        </Typography>
      ),
      permission: (
        <Typography>{renderNamePermission(account.permissionId)}</Typography>
      ),
      action: (
        <Box>
          {account.isLock ? (
            <>
              <Tooltip title="M??? kh??a" arrow placement="top-start">
                <IconButton
                  disabled={account.isDefault}
                  onClick={() => {
                    handleUnlockUser(account.id);
                  }}
                  color="success"
                >
                  <LockOutlinedIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Kh??a t??i kho???n" arrow placement="top-start">
                <IconButton
                  disabled={account.isDefault}
                  onClick={() => {
                    handleLockUser(account.id);
                  }}
                  color="primary"
                >
                  <LockOpenIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* <Tooltip title="S???a t??i kho???n" arrow placement="top-start">
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
        loading={loading.getAll && loading.getPermission}
      />
    </>
  );
}

export default ManagementAccount;
