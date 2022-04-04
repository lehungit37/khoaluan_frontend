import React from "react";
import {
  Button,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
  Link,
} from "@mui/material";
import style from "./style";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Title } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Message } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Images from "../../../constant/images";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(style);

const conTent = {
  title:
    "CHO THUÊ PHÒNG TRỌ MỚI XÂY DẠNG CHUNG CƯ MINI MÁY LẠNH Đ.VÕ VĂN KIỆT, Q.8 RẤT GẦN Q5, Q6 ",
  price: "2.6 triệu/tháng",
  address: "Quận 8, Hồ Chí Minh",
  phone: "Gọi 076383542",
  name: "Huy",
  createdAt: "10 giờ trước",
};
function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.container}
      >
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Kênh thông tin Phòng Trọ số 1 Đà Nẵng
        </Typography>
        <Typography sx={{ padding: "1rem 0" }}>
          Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê
          phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+
          tin đăng và 2.500.000 lượt xem mỗi tháng.
        </Typography>
        <Card
          className={classes.Card}
          sx={{ maxWidth: 400, borderRadius: "15px" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="https://danangreviews.vn/wp-content/uploads/2021/05/ca-chep-hoa-rong.jpg"
              alt="danangdep"
            />
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Phòng Trọ Đà Nẵng
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid container className={classes.content}>
        <Grid
          item
          md={9}
          sx={{
            border: "1px solid #B7C9C9",
            // marginLeft: "10%",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ margin: "0 0.5rem" }} variant="h6">
            Danh sách bài đăng
          </Typography>
          <Grid
            sx={{ padding: "0.5rem 1rem" }}
            className={classes.content_left}
          >
            <Typography style={{ fontWeight: "bold", padding: "0.5rem 0" }}>
              Sắp xếp:
            </Typography>
            <Button style={{ margin: "0 0.5rem" }} variant="outlined">
              Mặc định
            </Button>
            <Button variant="outlined">Mới nhất</Button>
            <Button
              style={{ margin: "0 0.5rem", fontWeight: "bold" }}
              variant="outlined"
            >
              Có video
            </Button>
          </Grid>
          <Grid
            sx={{
              borderTop: "1px solid red",
              background: "#FFEFD5",
              width: "100%",
            }}
            className={classes.content_left}
          >
            {/* Đây là ảnh */}
            <Grid item md={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  image="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2019/05/01/6c50059a-540b-4114-bb04-8167f4a6017f_1556704208.jpg"
                  alt="danangdangsong"
                />
              </CardActionArea>
            </Grid>
            {/* Đây là nội dung */}
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
                <Link
                  sx={{
                    fontWeight: "bold",
                    color: "red",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                  {conTent.title}
                </Link>
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
                <AttachMoneyIcon />
                {conTent.price}
              </Typography>

              {/* 3.address */}
              <Link
                sx={{
                  cursor: "pointer",
                  margin: "0.5rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <HomeIcon />
                {conTent.address}
              </Link>

              {/* 4.createAt */}
              <Typography
                sx={{
                  cursor: "pointer",
                  margin: "0rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccessTimeIcon />
                {conTent.createdAt}
              </Typography>

              {/* Avt+name+phone */}
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  padding: "0 1rem",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                  <Typography sx={{ padding: "0.5rem 0.5rem" }}>
                    {conTent.name}
                  </Typography>
                </Typography>
                <Grid>
                  <Button variant="contained">{conTent.phone}</Button>
                  <Button variant="outlined">Nhắn Zalo</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              borderTop: "1px solid red",
              background: "#FFEFD5",
              width: "100%",
            }}
            className={classes.content_left}
          >
            {/* Đây là ảnh */}
            <Grid item md={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  image="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2019/05/01/6c50059a-540b-4114-bb04-8167f4a6017f_1556704208.jpg"
                  alt="danangdangsong"
                />
              </CardActionArea>
            </Grid>
            {/* Đây là nội dung */}
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
                <Link
                  sx={{
                    fontWeight: "bold",
                    color: "red",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                  {conTent.title}
                </Link>
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
                <AttachMoneyIcon />
                {conTent.price}
              </Typography>

              {/* 3.address */}
              <Link
                sx={{
                  cursor: "pointer",
                  margin: "0.5rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <HomeIcon />
                {conTent.address}
              </Link>

              {/* 4.createAt */}
              <Typography
                sx={{
                  cursor: "pointer",
                  margin: "0rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccessTimeIcon />
                {conTent.createdAt}
              </Typography>

              {/* Avt+name+phone */}
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  padding: "0 1rem",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                  <Typography sx={{ padding: "0.5rem 0.5rem" }}>
                    {conTent.name}
                  </Typography>
                </Typography>
                <Grid>
                  <Button variant="contained">{conTent.phone}</Button>
                  <Button variant="outlined">Nhắn Zalo</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              borderTop: "1px solid red",
              background: "#FFEFD5",
              width: "100%",
            }}
            className={classes.content_left}
          >
            {/* Đây là ảnh */}
            <Grid item md={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  image="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2019/05/01/6c50059a-540b-4114-bb04-8167f4a6017f_1556704208.jpg"
                  alt="danangdangsong"
                />
              </CardActionArea>
            </Grid>
            {/* Đây là nội dung */}
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
                <Link
                  sx={{
                    fontWeight: "bold",
                    color: "red",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                  {conTent.title}
                </Link>
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
                <AttachMoneyIcon />
                {conTent.price}
              </Typography>

              {/* 3.address */}
              <Link
                sx={{
                  cursor: "pointer",
                  margin: "0.5rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <HomeIcon />
                {conTent.address}
              </Link>

              {/* 4.createAt */}
              <Typography
                sx={{
                  cursor: "pointer",
                  margin: "0rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccessTimeIcon />
                {conTent.createdAt}
              </Typography>

              {/* Avt+name+phone */}
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  padding: "0 1rem",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                  <Typography sx={{ padding: "0.5rem 0.5rem" }}>
                    {conTent.name}
                  </Typography>
                </Typography>
                <Grid>
                  <Button variant="contained">{conTent.phone}</Button>
                  <Button variant="outlined">Nhắn Zalo</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          hello
          <Fab color="primary" aria-label="message">
            <Message />
          </Fab>
          <Fab sx={{ background: "#FF69B4" }} variant="extended">
            <NavigationIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
