import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getInfoPost } from "../../../app/post_slice";
import Loading from "../../../components/loading";
import Footer from "../../../components/user/footer";
import { customMoney } from "../../../utils/helper";
import PostMap from "./../../user_management/new_post/component/map/post_map";
import Slide from "./component/slide";
import style from "./style";

const useStyles = makeStyles(style);

const ButtonStyled = styled(Button)({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  columnGap: "5px",
  "&:hover": {
    background: "#f1f1f1",
    transition: ".2s",
  },
});

function RoomDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, infoPost, infoAuthorPost, lastestPost, relatedPost } =
    useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoPost(id));
  }, [id]);

  if (loading.getInfo) {
    return <Loading />;
  }

  console.log(infoPost);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "1rem 2rem",
          "@media(max-width:768px)": {
            padding: "0.5rem",
          },
        }}
      >
        <Grid item md={8} lg={8} xs={12}>
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
              gap: "15px",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                "@media (max-width:768px)": {
                  flexDirection: "column-reverse",
                },
              }}
              variant="h5"
              color="red"
            >
              {infoPost?.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", spacing: "5px" }}>
              <LocationOnIcon color="primary" size="small" />
              <Typography>?????a ch???: {infoPost?.address}</Typography>
            </Box>

            <Grid container columnSpacing={2}>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AttachMoneyIcon color="error" size="small" />
                <Typography
                  sx={{ fontWeight: "bold" }}
                  color="red"
                  variant="h6"
                >
                  {customMoney(infoPost.price)} / Th??ng
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AccessTimeIcon />
                <Typography>{moment(infoPost?.createdAt).fromNow()}</Typography>
              </Grid>
            </Grid>

            <Box>
              <Typography
                sx={{ fontWeight: "bold", padding: "10px 0px" }}
                variant="h5"
              >
                Th??ng tin m?? t???
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                }}
              >
                {infoPost.description}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "bold", padding: "10px 0px" }}
                variant="h5"
              >
                Th??ng tin li??n h???
              </Typography>
              <Grid flexDirection={"column"} container>
                <Grid item display="flex">
                  <Grid item md={2}>
                    <Typography>Li??n h???:</Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Typography>{infoAuthorPost?.name}</Typography>
                  </Grid>
                </Grid>
                <Grid item display="flex">
                  <Grid item md={2}>
                    <Typography>??i???n tho???i:</Typography>
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
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "bold", padding: "10px 0px" }}
                variant="h5"
              >
                B???n ?????
              </Typography>
              <Typography sx={{ marginBottom: "10px" }}>
                ?????a ch???: {infoPost.address}
              </Typography>
              <Box sx={{ height: "350px" }}>
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
              rowGap: "5px",
              height: "230px",
              border: "1px solid #FEBB02",
              borderRadius: "15px ",
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
              <Typography>??ang ho???t ?????ng</Typography>
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
                Nh???n Zalo
              </ButtonStyled>
            </Box>
          </Box>

          {/* tin moi nhat */}

          <Box sx={{ marginTop: "30px" }}>
            <Typography
              sx={{ fontWeight: "bold", padding: "15px 0px" }}
              variant="h5"
            >
              Tin m???i nh???t
            </Typography>
            <Grid container>
              {lastestPost?.map((post) => {
                return (
                  <Grid
                    sx={{
                      borderBottom: "1px solid red",
                      background: "#FFEFD5",
                      width: "100%",
                    }}
                    className={classes.content_left}
                  >
                    {/* ????y l?? ???nh */}
                    <Grid item md={4}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="150px"
                          image={post.imagePost}
                          alt="danangdangsong"
                        />
                      </CardActionArea>
                    </Grid>
                    {/* ????y l?? n???i dung */}
                    <Grid item md={8}>
                      {/* 1.Title */}
                      <Grid
                        sx={{
                          margin: "0 1rem",
                          overflow: "hidden",
                          lineHeight: "25px",
                          webkitLineClamp: "2",
                          height: "50px",
                          display: "webkitBox",
                          webkitBoxOrient: "variant",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip title={post.title} arrow placement="top">
                          <Link
                            style={{
                              fontWeight: "bold",
                              color: "red",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            to={`/chi-tiet-phong-tro/${post.id}`}
                          >
                            {post.title}
                          </Link>
                        </Tooltip>
                      </Grid>

                      {/* 2.price */}
                      <Typography
                        sx={{
                          color: "#65C750",
                          fontWeight: "bold",
                          margin: "0rem 1rem",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {customMoney(post.price)}
                      </Typography>

                      {/* 4.createAt */}
                      <Typography
                        sx={{
                          cursor: "pointer",
                          margin: "0rem 1rem",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {moment(post.createdAt).startOf("hour").fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {relatedPost.length > 0 && (
            <Box sx={{ marginTop: "30px" }}>
              <Typography
                sx={{ fontWeight: "bold", padding: "15px 0px" }}
                variant="h5"
              >
                Tin li??n quan
              </Typography>
              <Grid container>
                {relatedPost?.map((post) => {
                  return (
                    <Grid
                      sx={{
                        borderTop: "1px solid red",
                        background: "#FFEFD5",
                        width: "100%",
                      }}
                      className={classes.content_left}
                    >
                      {/* ????y l?? ???nh */}
                      <Grid item md={5} xs={5}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="150px"
                            image={post?.imagePost}
                            alt="danangdangsong"
                          />
                        </CardActionArea>
                      </Grid>
                      {/* ????y l?? n???i dung */}
                      <Grid item md={7} xs={7}>
                        {/* 1.Title */}
                        <Grid
                          sx={{
                            margin: "0 1rem",
                            overflow: "hidden",
                            lineHeight: "25px",
                            webkitLineClamp: "2",
                            height: "50px",
                            display: "webkitBox",
                            webkitBoxOrient: "variant",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Tooltip title={post?.title} arrow placement="top">
                            <Link
                              style={{
                                fontWeight: "bold",
                                color: "red",
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                              to={`/chi-tiet-phong-tro/${post?.id}`}
                            >
                              {post.title}
                            </Link>
                          </Tooltip>
                        </Grid>

                        {/* 2.price */}
                        <Typography
                          sx={{
                            color: "#65C750",
                            fontWeight: "bold",
                            margin: "0rem 1rem",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {customMoney(post?.price)}
                        </Typography>

                        {/* 4.createAt */}
                        <Typography
                          sx={{
                            cursor: "pointer",
                            margin: "0rem 1rem",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {moment(post?.createdAt).startOf("hour").fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
          {/* tin lien quan  */}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default RoomDetail;
