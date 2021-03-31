import React, { Component } from "react";
import PropTypes from "prop-types";

/** Styles */
import "./googleCloud.less";

/** Components */
import LoadingIndicator from "../LoadingIndicator";

class LocationsList extends Component {
  state = {
    search: "",
  };

  static propTypes = {
    locations: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    loading: true,
  };

  renderTableRow = (location) => {
    return (
      <tr
        key={location.locationId}
        className={
          this.state.highlightedItem === location.locationId
            ? "noselect active"
            : "noselect"
        }
        onMouseEnter={() => {
          this.onHighlightItem(location.locationId);
        }}
        onClick={() => {
          this.props.onSelect(location);
        }}
      >
        <td>{location.name.split("/")[3]}</td>
      </tr>
    );
  };

  onHighlightItem(locationId) {
    this.setState({ highlightedItem: locationId });
  }

  render() {
    const { loading, locations, filter, error } = this.props;

    if (error) {
      return <p>{error}</p>;
    }

    if (loading) {
      return <LoadingIndicator expand height="70px" width="70px" />;
    }

    const body = (
      <tbody id="LocationList">
        {locations
          .filter(
            (location) =>
              location.name
                .split("/")[3]
                .toLowerCase()
                .includes(filter.toLowerCase()) || filter === ""
          )
          .map(this.renderTableRow)}
      </tbody>
    );

    return (
      <table id="tblLocationList" className="gcp-table table noselect">
        <thead>
          <tr>
            <th>{"Location"}</th>
          </tr>
        </thead>
        {locations && body}
      </table>
    );
  }
}

export default LocationsList;
