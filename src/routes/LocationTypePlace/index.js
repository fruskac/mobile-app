// @flow

import { connect } from "react-redux";
import LocationTypePlace from "./LocationTypePlace";
import { getLocationsFiltered } from "../../selectors/locations";

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  return {
    items: getLocationsFiltered(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypePlace);
