import React from "react";

class ResturantsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.resturants.map(resturant => {
          return (
            <li key={resturant.id} className="resturant">
              <div className="resturant__hero">
                <h1 className="resturant__name">{resturant.name}</h1>
                <img src={resturant.icon} alt="" className="resturant__icon" />
              </div>
              <div className="resturant__row">
                <p className="item">Rating</p>
                <p className="description">{resturant.rating || "N/A"}</p>
              </div>
            </li>
          );
        })}
      </div>
    );
  }
}

export default ResturantsList;
