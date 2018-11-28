// @flow

import { connect } from "react-redux";
import Trails from "./Trails";
import { onNavigate } from "../../actions/navigation";
// import { getLocationsFiltered } from "../../selectors/locations";

const mapDispatchToProps = {onNavigate};

const mapStateToProps = (state, ownProps) => {
  return {
    items: [] // getLocationsFiltered(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trails);