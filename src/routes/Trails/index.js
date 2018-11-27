// @flow

import { connect } from "react-redux";
import Trails from "./Trails";
// import { getLocationsFiltered } from "../../selectors/locations";

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    items: [] // getLocationsFiltered(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trails);