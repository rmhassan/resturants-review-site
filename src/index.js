import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";
import ResturantsList from "./resturants";
import SearchInput from "./search";
import Filter from "./filter";
import "./index.css";
import $ from "jquery";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 33.6844,
      lng: 73.0479,
      resturantsList: [],
      filter: {
        rating: "1",
        searchText: ""
      }
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    $.getJSON("../resturants.json", data => {
      this.setState({
        resturantsList: data
      });
    });
    // let success = position => {
    //   const latitude = position.coords.latitude;
    //   const longitude = position.coords.longitude;
    //   this.setState({
    //     lat: latitude,
    //     lng: longitude
    //   });
    // };

    // function error() {
    //   console.log("Unable to retrieve your location");
    // }
    // navigator.geolocation.getCurrentPosition(success, error);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.6844,73.0479&radius=1500&type=restaurant&key=api_key";

    fetch(proxyurl + url)
      .then(res => res.json())
      .then(
        result => {
          console.log(result.results);

          let allResturants = this.state.resturantsList.concat(
            ...result.results
          );
          this.setState({
            resturantsList: allResturants
          });
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

  handleFilter(e) {
    this.setState({
      filter: {
        rating: e.target.value,
        searchText: this.state.filter.searchText
      }
    });
  }
  handleInput(e) {
    this.setState({
      filter: {
        rating: this.state.filter.rating,
        searchText: e.target.value
      }
    });
  }

  render() {
    // Filter function
    const filteredResturants = this.state.resturantsList.filter(resturant => {
      const filterExpression =
        resturant.name
          .toLowerCase()
          .includes(this.state.filter.searchText.toLowerCase()) &&
        resturant.rating >= this.state.filter.rating;
      return filterExpression;
    });
    return (
      <div className="container">
        <div className="map">
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=api_key"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `95vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={this.state.lat}
            lng={this.state.lng}
            markers={filteredResturants}
          />
        </div>
        <div style={{ width: "30%" }} className="resturantList">
          <div className="filterBar">
            <SearchInput handleInput={this.handleInput} />
            <Filter handleFilter={this.handleFilter} />
          </div>
          <ResturantsList resturants={filteredResturants} />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Location />, document.getElementById("root"));
