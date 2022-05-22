import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Box, IconButton, Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "query-string";
import { useHistory } from "react-router-dom";
import { openModal } from "../../../app/modal_slice";
import MainTable from "../../../custom_fileds/table/MainTable";
import AddUpdateCategory from "./component/add_update_category/index";
import { getData, setValueEditCategory } from "./category_slice";
import DeleteCategoryModal from "./component/delete/index";

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
    Header: "Tên danh mục",
    Footer: "Tên danh mục",
    accessor: "nameCategories",
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

const useStyles = makeStyles();
function ManagementCategory() {
  const classes = useStyles();
  const token = Cookies.get("token");
  const history = useHistory();
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);
  const { categoryList, limit, page, totalData, loading } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const param = qs.stringify({ page, limit });
    if (me.id) {
      dispatch(getData(param));
    }
  }, [me, page, limit]);

  const handleOpenModalEdit = (category) => {
    dispatch(
      setValueEditCategory({
        id: category.id,
        nameCategories: category.nameCategories
      })
    );
    dispatch(openModal({ dialogProps: {}, dialogType: AddUpdateCategory }));
  };

  const handleOpenModalDelete = (id) => {
    dispatch(
      openModal({ dialogProps: { id }, dialogType: DeleteCategoryModal })
    );
  };

  const tableData = categoryList?.map((category, index) => {
    return {
      index: index + 1,
      nameCategories: category.nameCategories,
      action: (
        <Box>
          <Tooltip title="Sửa danh mục" arrow placement="top-start">
            <IconButton
              onClick={() => {
                handleOpenModalEdit(category);
              }}
            >
              <ModeEditOutlineIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa danh mục" arrow placement="top-start">
            <IconButton
              onClick={() => {
                handleOpenModalDelete(category.id);
              }}
            >
              <DeleteOutlineOutlinedIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    };
  });

  const handleAddCategory = () => {
    dispatch(openModal({ dialogProps: {}, dialogType: AddUpdateCategory }));
  };

  const handleChangePage = (page) => {
    console.log(page);
  };

  //   if (loading.getPostByUser) return <Loading />;
  return (
    <>
      <MainTable
        className={classes.table}
        tableData={tableData}
        column={columnsTable}
        limit={limit}
        page={1}
        totalPage={Math.ceil(totalData / limit)}
        handleChangePageTable={handleChangePage}
        isShowPagination={true}
        isShowFilter={false}
        hideCheckbox={true}
        totalData={totalData}
        size="small"
        loading={loading.getData}
        height="100vh"
      />
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        sx={{ right: "36px", bottom: "36px", position: "absolute" }}
        onClick={handleAddCategory}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default ManagementCategory;
