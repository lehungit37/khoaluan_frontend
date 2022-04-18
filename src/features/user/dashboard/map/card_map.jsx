import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Tooltip,
  IconButton
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { customMoney } from "./../../../../utils/helper";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { changeLikePost } from "../dashboard_slice";
import { useDispatch } from "react-redux";
export const CardMap = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(data?.favorite);

  const changeFavorite = (status) => {
    const favoritePostList = localStorage.getItem("favoritePost");
    let cloneFavorite = favoritePostList?.split(",");
    if (status) {
      if (!cloneFavorite) {
        cloneFavorite = [];
        cloneFavorite[0] = data.id;
      } else {
        cloneFavorite?.push(data.id);
      }
    } else {
      const index = cloneFavorite?.findIndex((item) => item === data.id);
      cloneFavorite?.splice(index, 1);
    }

    const payload = { id: data.id, status };
    dispatch(changeLikePost(payload));
    setIsLike(status);
    localStorage.setItem("favoritePost", cloneFavorite);
  };

  console.log(data);
  return (
    <Card
      sx={{ minWidth: 200, maxWidth: 300, position: "relative" }}
      elevation={0}
    >
      <CardMedia
        component="img"
        height="140"
        sx={{ objectFit: "cover" }}
        image={data?.imagePost}
        alt="green iguana"
      />
      <CardContent>
        <Tooltip title={data?.title} arrow placement="top">
          <Typography noWrap gutterBottom variant="h6" component="h3">
            {data?.title}
          </Typography>
        </Tooltip>
        <Tooltip title={data?.address} arrow placement="top">
          <Typography
            gutterBottom
            noWrap
            variant="body1"
            color="text.secondary"
          >
            Địa chỉ: {data?.address}
          </Typography>
        </Tooltip>
        <Typography gutterBottom noWrap variant="body1" color="text.secondary">
          Liên hệ: {data?.infoConnect}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Giá: {customMoney(data?.price)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {moment(data?.createdAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            console.log("click");
            history.push(`/chi-tiet-phong-tro/${data?.id}`);
          }}
          variant="contained"
          fullWidth
          size="small"
        >
          Xem chi tiết
        </Button>
      </CardActions>

      {isLike === true ? (
        <IconButton
          onClick={() => changeFavorite(false)}
          sx={{ position: "absolute", right: "0px", top: "0px" }}
        >
          <FavoriteOutlinedIcon color="error" />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => changeFavorite(true)}
          sx={{ position: "absolute", right: "0px", top: "0px" }}
        >
          <FavoriteBorderOutlinedIcon sx={{ color: "#fff" }} />
        </IconButton>
      )}
    </Card>
  );
};
