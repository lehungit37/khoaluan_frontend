import LocationOnIcon from "@mui/icons-material/LocationOn";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker, Popup, Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaHVuZ2xlMzciLCJhIjoiY2wxNjdhZXRuMHI3ZTNic2drdzBndHRjeCJ9.DbPMIjnvs7fhmLnyIIBVSg"
});

function PostMap(props) {
  const { rootLocation } = props;
  const [location, setLocation] = useState({
    lat: 16.054407,
    lng: 108.202164
  });

  useEffect(() => {
    if (rootLocation) {
      let arrLocation = rootLocation?.split(",");
      setLocation({
        lat: parseFloat(arrLocation[0]),
        lng: parseFloat(arrLocation[1])
      });
    }
  }, [rootLocation]);

  const handleOpenPopup = () => {
    alert("Clicked");
  };
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "50vh",
        width: "100%"
      }}
      center={[location.lng, location.lat]}
      zoom={[14]}
    >
      {rootLocation ? (
        <Marker
          onClick={handleOpenPopup}
          coordinates={[location.lng, location.lat]}
          anchor="bottom"
        >
          <LocationOnIcon color="error" fontSize="large" />
        </Marker>
      ) : (
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[location.lng, location.lat]} />
        </Layer>
      )}
    </Map>
  );
}

export default PostMap;
