import TuneIcon from "@mui/icons-material/Tune";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDistrictId,
  changePricePost
} from "../../../features/user/dashboard/dashboard_slice";
import SelectForm from "./../../../custom_fileds/hook-form/select_form/index";
import style from "./style";

const useStyles = makeStyles(style);

const priceSelectList = [
  {
    id: "all",
    name: "Tất cả",
    from: 0,
    to: 99999999999
  },
  {
    id: "1",
    name: "Dưới 1 triệu",
    from: 0,
    to: 999999
  },
  {
    id: "2",
    name: "Từ 1 triệu đến 3 triệu",
    from: 1000000,
    to: 3000000
  },
  {
    id: "3",
    name: "Trên 3 triệu",
    from: 3000001,
    to: 99999999999
  }
];
export default function FilterPost() {
  const [state, setState] = React.useState({
    left: false
  });
  const dispatch = useDispatch();

  const { priceSelected, districtList, loading, postData } = useSelector(
    (state) => state.dashboardReducer
  );

  const classes = useStyles();
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      priceSelect: priceSelected,
      districtId: "all"
    }
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };

  const handleChangePrice = (value) => {
    const { from, to } = priceSelectList.find(
      (item) => item.id === value.value
    );

    dispatch(changePricePost({ from, to, priceSelected: value.value }));
  };

  const handleChangeDistrict = (value) => {
    const code = value.value;

    dispatch(changeDistrictId({ districtId: code }));
  };

  const list = () => (
    <Box sx={{ width: 350, padding: "10px" }} role="presentation">
      {/* {loading.getData && <LinearProgress />} */}
      <Typography variant="h5" sx={{ fontWeight: "700" }}>
        Lọc bài viết
      </Typography>
      <Grid container sx={{ width: "100%" }}>
        <Grid item sx={{ width: "100%" }}>
          <SelectForm
            name="priceSelect"
            label="Chọn giá"
            control={control}
            errors={errors}
            options={priceSelectList}
            keyItem="id"
            labelItem="name"
            size="small"
            onChange={handleChangePrice}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <SelectForm
            name="districtId"
            label="Chọn Quận / Huyện"
            control={control}
            errors={errors}
            options={districtList}
            keyItem="code"
            labelItem="name"
            size="small"
            onChange={handleChangeDistrict}
          />
        </Grid>
      </Grid>
      <Typography
        variant="p"
        sx={{ color: "red" }}
      >{`Tìm thấy ${postData.length} kết quả`}</Typography>
    </Box>
  );

  return (
    <React.Fragment>
      <Box className={classes.positionButton}>
        <Button
          variant="contained"
          onClick={toggleDrawer(true)}
          startIcon={<TuneIcon />}
        >
          Tìm kiếm nâng cao
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </Box>
    </React.Fragment>
  );
}
