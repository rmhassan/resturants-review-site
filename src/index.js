import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";
import ResturantsList from "./resturants";
import "./index.css";
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: 33.6844, lng: 73.0479, resturantsList: [] };
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=31.5204,74.3587&radius=1500&type=restaurant&key=AIzaSyC0FOtX3YbEpBiN5tqyVJQDvQaDJzA-N3g";

    fetch(proxyurl + url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            resturantsList: result.results
          });
          console.log(result.results);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
          console.log("error");
        }
      );
  }
  render() {
    return (
      <div className="container">
        <div className="map">
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDmYOV6jyCwchqURbvPOnD5v7NoxUIR4r4"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `95vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={this.state.lat}
            lng={this.state.lng}
            markers={this.state.resturantsList}
          />
        </div>
        <div style={{ width: "30%" }} className="resturantList">
          <ResturantsList resturants={this.state.resturantsList} />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Location />, document.getElementById("root"));
