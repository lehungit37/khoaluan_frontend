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
function ManagementPermission() {
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
      Header: "Tên quyền",
      Footer: "Tên quyền",
      accessor: "namePermission",
      disableFilter: false,
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
      namePermission: "quản trị hệ thống",
    },
  ];

  const tableData = datafetch?.map((permission, index) => {
    return {
      index: index + 1,

      namePermission: permission.namePermission,

      action: (
        <Box>
          <Tooltip title="Sửa quyền" arrow placement="top-start">
            <IconButton>
              <ModeEditOutlineIcon color="success" />
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

export default ManagementPermission;
