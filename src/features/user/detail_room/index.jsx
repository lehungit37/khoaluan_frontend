import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoPost } from "../../../app/post_slice";
import Loading from "../../../components/loading";
import { customMoney } from "./../../../utils/helper";
import PostMap from "./../../user_management/new_post/component/map/post_map";
import Slide from "./component/slide";
import { styled } from "@mui/material/styles";

const ButtonStyled = styled(Button)({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  columnGap: "5px",
  "&:hover": {
    background: "#f1f1f1",
    transition: ".2s"
  }
});

function RoomDetail() {
  const { id } = useParams();
  const { loading, infoPost, infoAuthorPost } = useSelector(
    (state) => state.postReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoPost(id));
  }, [id]);

  if (loading.getInfo) {
    return <Loading />;
  }

  console.log(infoPost);
  return (
    <Grid
      container
      spacing={3}
      sx={{ padding: "0% 10%", margin: "20px 0px", maxWidth: "100%" }}
    >
      <Grid item md={8} lg={8}>
        {infoPost?.relatedImagesLists?.length > 0 && (
          <Slide imagesLink={infoPost?.relatedImagesLists} />
        )}
        {/*info ROom*/}
        <Box
          sx={{
            padding: "10px 20px",
            border: "2px solid #eee",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <Typography
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
            variant="h5"
            color="red"
          >
            {infoPost?.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", spacing: "5px" }}>
            <LocationOnIcon color="primary" size="small" />
            <Typography>Địa chỉ: {infoPost?.address}</Typography>
          </Box>

          <Grid container columnSpacing={2}>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <AttachMoneyIcon color="error" size="small" />
              <Typography sx={{ fontWeight: "bold" }} color="red" variant="h6">
                {customMoney(infoPost.price)} / Tháng
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <AccessTimeIcon />
              <Typography>
                {moment(infoPost.createdAt).startOf("hour").fromNow()}
              </Typography>
            </Grid>
          </Grid>

          <Box>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Thông tin mô tả
            </Typography>
            <Typography
              sx={{
                whiteSpace: "pre-line"
              }}
            >
              {infoPost.description}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Thông tin liên hệ
              <Grid flexDirection={"column"} container>
                <Grid item display="flex">
                  <Grid item md={2}>
                    <Typography>Liên hệ:</Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Typography>{infoAuthorPost?.name}</Typography>
                  </Grid>
                </Grid>
                <Grid item display="flex">
                  <Grid item md={2}>
                    <Typography>Điện thoại:</Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Typography>{infoAuthorPost?.phoneNumber}</Typography>
                  </Grid>
                </Grid>
                <Grid item display="flex">
                  <Grid item md={2}>
                    <Typography>Zalo:</Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Typography>{infoAuthorPost?.phoneNumber}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Bản đồ
            </Typography>
            <Typography>Địa chỉ: {infoPost.address}</Typography>
            <Box>
              <PostMap rootLocation={infoPost.rootLocation} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: " column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FEBB02",
            padding: "10px",
            rowGap: "5px"
          }}
        >
          <Avatar
            sx={{ width: "50px", height: "50px" }}
            alt="Cindy Baker"
            src={infoAuthorPost?.imageUrl}
          />
          <Typography noWrap variant="h6">
            {infoAuthorPost.name}
          </Typography>
          <Box sx={{ display: " flex", alignItems: "center" }}>
            <FiberManualRecordSharpIcon
              color="success"
              sx={{ fontSize: "12px" }}
            />
            <Typography>Đang hoạt động</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Button
              variant="contained"
              fullWidth
              href={`tel:${infoAuthorPost.phoneNumber}`}
              startIcon={<LocalPhoneIcon />}
            >
              {infoAuthorPost?.phoneNumber}
            </Button>
          </Box>
          <Box sx={{ width: "100%" }}>
            <ButtonStyled
              variant="outlined"
              fullWidth
              onClick={() => {
                const url = `https://zalo.me/${infoAuthorPost.phoneNumber}`;
                window.open(url, "_blank");
              }}
            >
              <Avatar
                sx={{ height: "24px", width: "24px" }}
                src="http://localhost:3000/api/images/zalo_icon.png"
              />
              Nhắn Zalo
            </ButtonStyled>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RoomDetail;
