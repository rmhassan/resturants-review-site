import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      )}
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
        {props.markers.map(marker => (
          <Marker
            key={marker.id}
            position={{
              lat: marker.geometry.location.lat,
              lng: marker.geometry.location.lng
            }}
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  ))
);

export default MyMapComponent;
