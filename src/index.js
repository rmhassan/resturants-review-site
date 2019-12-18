import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: -32.5, lng: 72.5 };
  }
  componentDidMount() {
    let success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({
        lat: latitude,
        lng: longitude
      });
    };

    function error() {
      console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }
  render() {
    return (
      <div>
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKDrGe-sGHd2FERdA25ANVQDCZ5sd6Dsc&callback=initMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    );
  }
}
ReactDOM.render(<Location />, document.getElementById("root"));
