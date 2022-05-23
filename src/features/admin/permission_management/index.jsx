import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainTable from "../../../custom_fileds/table/MainTable";
import { Box, Tooltip, IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import qs from "query-string";
import {
  getDataPermission,
  setInfoEdit
} from "./../../../app/permission_slice";
import { openModal } from "../../../app/modal_slice";
import UpdatePermission from "./component/update_permission";

const useStyles = makeStyles();
function ManagementPermission() {
  const classes = useStyles();
  const history = useHistory();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);

  const { permissionList, loading, totalData, page, limit } = useSelector(
    (state) => state.permissionReducer
  );

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
      Header: "Mã quyền",
      Footer: "Mã quyền",
      accessor: "id",
      disableFilter: false,
      align: "left",
      width: "auto"
    },
    {
      Header: "Tên quyền",
      Footer: "Tên quyền",
      accessor: "namePermission",
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

  useEffect(() => {
    if (me?.id) {
      const param = qs.stringify({ limit, page });
      dispatch(getDataPermission(param));
    }
  }, [me, page, limit]);

  const handleOpenModalEdit = (permission) => {
    dispatch(setInfoEdit(permission));

    dispatch(
      openModal({
        dialogProps: {},
        dialogType: UpdatePermission
      })
    );
  };

  const tableData = permissionList?.map((permission, index) => {
    return {
      index: index + 1,
      id: permission?.id,
      namePermission: permission?.namePermission,
      action: (
        <Box>
          <Tooltip title="Sửa quyền" arrow placement="top-start">
            <IconButton
              onClick={() => {
                handleOpenModalEdit(permission);
              }}
            >
              <ModeEditOutlineIcon color="success" />
            </IconButton>
          </Tooltip>
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
        // handleChangePageTable={handleChangePage}
        isShowPagination={true}
        isShowFilter={false}
        hideCheckbox={true}
        totalData={totalData}
        size="small"
        loading={loading.getData}
        height="100vh"
      />
    </>
  );
}

export default ManagementPermission;
