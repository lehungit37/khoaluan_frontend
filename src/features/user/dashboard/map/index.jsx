import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  useGoogleMap
} from "@react-google-maps/api";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import Images from "../../../../constant/images";
import { CardMap } from "./card_map";

const containerStyle = {
  width: "100%",
  flex: 1
};

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

function MapPost(props) {
  const { rootLocation, myLocation } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD4IU5fZNo62r2eMFZsTI2ZGY3ni6OhqLk"
  });
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
  const [infoMarker, setInfoMarker] = useState({});

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

  const options = {
    minZoom: 10,
    maxZoom: 18,
    styles: mapStyle
  };

  const handleOpenPopup = (item) => {
    setPopup(item);
    setCenterLocation({
      lng: parseFloat(item.rootLocation?.split(",")?.[1]),
      lat: parseFloat(item.rootLocation?.split(",")?.[0])
    });
  };
  const onUnmount = React.useCallback(function callback(map) {}, []);
  const renderMarkerPost = () => {
    return postData?.map((postItem) => {
      const arrLocation = postItem?.rootLocation?.split(",");
      return (
        <Marker
          icon={{
            url: Images.MAP_ICON,
            scaledSize: new window.google.maps.Size(40, 50)
          }}
          position={{
            lng: parseFloat(arrLocation?.[1]),
            lat: parseFloat(arrLocation?.[0])
          }}
          // icon={Images.HOME_ICON}
          onClick={(e) => {
            setPopup({
              lng: parseFloat(arrLocation?.[1]),
              lat: parseFloat(arrLocation?.[0])
            });

            setInfoMarker(postItem);
          }}
        />
      );
    });
  };

  const apiIsLoaded = (map, maps, lat, lng) => {
    if (map) {
      const latLng = maps.LatLng(lat, lng); // Makes a latlng
      map.panTo(latLng);
    }
  };

  return isLoaded ? (
    <GoogleMap
      ref={mapRef}
      mapContainerStyle={containerStyle}
      center={centerLocation}
      zoom={15}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
      options={options}
      onGoogleApiLoaded={({ map, maps }) =>
        apiIsLoaded(map, maps, props.lat, props.lng)
      }
      onClick={() => setPopup(null)}
    >
      {renderMarkerPost()}

      {/* <Marker
        position={{
          lng: myLocation?.lng,
          lat: myLocation?.lat
        }}
      /> */}
      {popup && (
        <InfoWindow
          onCloseClick={(e) => {
            setPopup(null);
          }}
          position={popup}
        >
          <CardMap data={infoMarker} />
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapPost;
