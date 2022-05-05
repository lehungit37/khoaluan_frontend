import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Images from "./../../../../../constant/images";

const containerStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
};

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
const options = {
  minZoom: 10,
  maxZoom: 18,
  styles: mapStyle,
};

function PostMap(props) {
  const { rootLocation } = props;
  const [location, setLocation] = useState({
    lat: 16.054407,
    lng: 108.202164,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD4IU5fZNo62r2eMFZsTI2ZGY3ni6OhqLk",
  });
  useEffect(() => {
    if (rootLocation) {
      let arrLocation = rootLocation?.split(",");
      setLocation({
        lat: parseFloat(arrLocation[0]),
        lng: parseFloat(arrLocation[1]),
      });
    }
  }, [rootLocation]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        options={options}
      >
        <Marker position={location} />
      </GoogleMap>
    )
  );
}

export default PostMap;
