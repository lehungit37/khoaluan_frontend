import * as React from "react";
import { Box, Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TuneIcon from "@mui/icons-material/Tune";

import style from "./style";
import { makeStyles } from "@mui/styles";
import SelectForm from "./../../../custom_fileds/hook-form/select_form/index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePricePost } from "../../../features/user/dashboard/dashboard_slice";

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

  const { priceSelected } = useSelector((state) => state.dashboardReducer);

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

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation">
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
      </Grid>
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
