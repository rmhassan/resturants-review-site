import React from "react";

class SearchInput extends React.Component {
  render() {
    return (
      <div className="search__container">
        <input
          type="text"
          className="serach__inputBox"
          placeholder="Search for Resturants"
          onChange={this.props.handleInput}
        ></input>
      </div>
    );
  }
}

export default SearchInput;
