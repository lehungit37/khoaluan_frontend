import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import MapPost from "./map";
import { useDispatch } from "react-redux";
import { getPostData } from "./dashboard_slice";
import { useParams } from "react-router-dom";
import moment from "moment";

function Dashboard() {
  const { id } = useParams();
  const [myLocation, setMyLocation] = useState({ lat: 0, lng: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      const { latitude, longitude } = postion.coords;
      setMyLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    dispatch(getPostData(id));
  }, [id]);
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <MapPost myLocation={myLocation} />
    </Box>
  );
}

export default Dashboard;
