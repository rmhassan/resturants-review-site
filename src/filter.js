import React from "react";

class Filter extends React.Component {
  render() {
    return (
      <div className="filter__container">
        <select onChange={e => this.props.handleFilter(e)}>
          <option name="one">1</option>
          <option name="two">2</option>
          <option name="three">3</option>
          <option name="four">4</option>
          <option name="five">5</option>
        </select>
      </div>
    );
  }
}

export default Filter;
