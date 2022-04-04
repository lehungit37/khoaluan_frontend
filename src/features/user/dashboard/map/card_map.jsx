import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Tooltip
} from "@mui/material";

import { customMoney } from "./../../../../utils/helper";
import moment from "moment";
import { useHistory } from "react-router-dom";
export const CardMap = ({ data }) => {
  const history = useHistory();
  return (
    <Card sx={{ minWidth: 200, maxWidth: 300 }} elevation={0}>
      <CardMedia
        component="img"
        height="140"
        sx={{ objectFit: "cover" }}
        image={data.imagePost}
        alt="green iguana"
      />
      <CardContent>
        <Tooltip title={data.title} arrow placement="top">
          <Typography noWrap gutterBottom variant="h6" component="h3">
            {data.title}
          </Typography>
        </Tooltip>
        <Tooltip title={data.address} arrow placement="top">
          <Typography
            gutterBottom
            noWrap
            variant="body1"
            color="text.secondary"
          >
            Địa chỉ: {data.address}
          </Typography>
        </Tooltip>
        <Typography gutterBottom noWrap variant="body1" color="text.secondary">
          Liên hệ: {data.infoConnect}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Giá: {customMoney(data.price)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {moment(data.createdAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            console.log("click");
            history.push(`/chi-tiet-phong-tro/${data.id}`);
          }}
          variant="contained"
          fullWidth
          size="small"
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
};
