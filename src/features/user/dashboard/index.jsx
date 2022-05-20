import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import MapPost from "./map";
import { useDispatch, useSelector } from "react-redux";
import { getPostData } from "./dashboard_slice";
import { useParams } from "react-router-dom";
import moment from "moment";
import FilterPost from "./../../../components/user/filter/index";
import queryString from "query-string";

function Dashboard() {
  const { id } = useParams();
  const [myLocation, setMyLocation] = useState({ lat: 0, lng: 0 });
  const { from, to, districtId } = useSelector(
    (state) => state.dashboardReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      const { latitude, longitude } = postion.coords;
      setMyLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const query = {
      categoryId: id,
      from,
      to,
      districtId
    };

    const param = queryString.stringify(query);
    dispatch(getPostData(param));
  }, [id, from, to, districtId]);
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <MapPost myLocation={myLocation} />
      <FilterPost />
    </Box>
  );
}

export default Dashboard;
