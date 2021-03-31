import React, { useState } from "react";
import PropTypes from "prop-types";

/** Components */
import LoadingIndicator from "../LoadingIndicator";

/** Styles */
import "./googleCloud.less";

const DICOMStoreList = ({ onSelect, loading, stores, filter, error }) => {
  const [state, setState] = useState({
    search: "",
  });

  const onHighlightItem = (store) => {
    setState((state) => ({ ...state, highlightedItem: store }));
  };

  const renderTableRow = (store) => {
    return (
      <tr
        key={store.name}
        className={
          state.highlightedItem === store.name ? "noselect active" : "noselect"
        }
        onMouseEnter={() => {
          onHighlightItem(store.name);
        }}
        onClick={() => {
          onSelect(store);
        }}
      >
        <td className="project">{store.name.split("/")[7]}</td>
      </tr>
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <LoadingIndicator expand height="70px" width="70px" />;
  }

  const body = (
    <tbody id="StoreList">
      {stores
        .filter(
          (store) =>
            store.name
              .split("/")[7]
              .toLowerCase()
              .includes(filter.toLowerCase()) || filter === ""
        )
        .map(renderTableRow)}
    </tbody>
  );

  return (
    <table id="tblStoreList" className="gcp-table table noselect">
      <thead>
        <tr>
          <th>{"DICOM Store"}</th>
        </tr>
      </thead>
      {stores && body}
    </table>
  );
};

DICOMStoreList.propTypes = {
  stores: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSelect: PropTypes.func,
};

DICOMStoreList.defaultProps = {
  loading: true,
};

export default DICOMStoreList;
