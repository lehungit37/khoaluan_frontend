import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Backdrop, Box, Button, CircularProgress, Fab } from "@mui/material";

import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactMapboxGl, { Marker, Popup, Layer, Feature } from "react-mapbox-gl";
import { useSelector } from "react-redux";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { CardMap } from "./card_map";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import axios from "axios";
import { LoadingButton } from "@mui/lab/LoadingButton";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaHVuZ2xlMzciLCJhIjoiY2wxNjdhZXRuMHI3ZTNic2drdzBndHRjeCJ9.DbPMIjnvs7fhmLnyIIBVSg"
});

function MapPost(props) {
  const { rootLocation, myLocation } = props;
  const mapRef = useRef();
  const [myRootLocation, setMyRootLocation] = useState({
    lat: 16.054407,
    lng: 108.202164
  });
  const [centerLocation, setCenterLocation] = useState({
    lat: 16.054407,
    lng: 108.202164
  });

  const [popup, setPopup] = useState(null);

  const [darkmode, setDarkmode] = useState(false);

  const [satellite, setSatellite] = useState(false);
  const [zoomMap, setZoomMap] = useState(14);
  const { loading, postData } = useSelector((state) => state.dashboardReducer);
  useEffect(() => {
    let unmount = false;
    if (myLocation) {
      if (!unmount) {
        setMyRootLocation(myLocation);
        setCenterLocation(myLocation);
      }
    }
    return () => {
      unmount = true;
    };
  }, [myLocation]);

  const handleOpenPopup = (item) => {
    setPopup(item);
    setCenterLocation({
      lng: parseFloat(item.rootLocation?.split(",")?.[1]),
      lat: parseFloat(item.rootLocation?.split(",")?.[0])
    });
  };

  const renderMarkerPost = () => {
    return postData?.map((postItem) => {
      const arrLocation = postItem?.rootLocation?.split(",");
      return (
        <Marker
          onClick={() => handleOpenPopup(postItem)}
          coordinates={[parseFloat(arrLocation?.[1]), arrLocation?.[0]]}
          anchor="bottom"
        >
          <HomeWorkIcon color="error" fontSize="medium" />
        </Marker>
      );
    });
  };

  return (
    <div
      style={{
        flex: 1,
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          display: "flex",
          gap: 1,
          flexDirection: "column",
          right: 0,
          zIndex: 5,
          mr: 2,
          mt: 2
        }}
      >
        <Fab
          size="small"
          color="primary"
          onClick={() => setDarkmode((prev) => !prev)}
          aria-label="add"
        >
          {darkmode ? (
            <WbSunnyOutlinedIcon color="#ff" fontSize="medium" />
          ) : (
            <BedtimeOutlinedIcon color="#ff" fontSize="medium" />
          )}
        </Fab>

        <Fab
          size="small"
          color="primary"
          onClick={() => setSatellite((prev) => !prev)}
          aria-label="add"
        >
          {!satellite ? (
            <PublicIcon color="#ff" fontSize="medium" />
          ) : (
            <PublicOffIcon color="#ff" fontSize="medium" />
          )}
        </Fab>
        <Fab
          size="small"
          color="primary"
          onClick={() => {
            setCenterLocation(myLocation);
            setPopup(null);
          }}
          aria-label="add"
        >
          <MyLocationIcon color="#fff" fontSize="medium" />
        </Fab>
      </Box>

      <Backdrop
        sx={{
          position: "absolute",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={loading.getData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Map
        onDrag={(e) => {
          setZoomMap(e.getZoom());

          setCenterLocation({
            lat: e.getCenter().lat,
            lng: e.getCenter().lng
          });
        }}
        movingMethod="easeTo"
        style={`mapbox://styles/mapbox/${
          satellite ? "satellite-v9" : darkmode ? "dark-v9" : "streets-v9"
        }`}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        onClick={(map, e) => {
          setPopup(null);

          axios
            .get(
              `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${e.lngLat.lng},${e.lngLat.lat}`
            )
            .then((res) => console.log(res.data));
        }}
        center={[centerLocation.lng, centerLocation.lat]}
        zoom={[zoomMap]}
      >
        {popup && (
          <Popup
            style={{
              zIndex: 1000
            }}
            coordinates={[
              parseFloat(popup.rootLocation?.split(",")?.[1]),
              parseFloat(popup.rootLocation?.split(",")?.[0])
            ]}
            offset={{
              "bottom-left": [12, -38],
              bottom: [0, -38],
              "bottom-right": [-12, -38]
            }}
            anchor="left"
          >
            <CardMap data={popup} />
          </Popup>
        )}
        <Marker
          coordinates={[myRootLocation.lng, myRootLocation.lat]}
          anchor="bottom"
        >
          <LocationOnIcon color="primary" fontSize="large" />
        </Marker>

        {renderMarkerPost()}
      </Map>
    </div>
  );
}

export default MapPost;
