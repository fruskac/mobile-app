// @flow

import { connect } from "react-redux";
import LocationTypePlace from "./LocationTypePlace";
import { getLocationsFiltered, getPlaceOrCategory } from "../../selectors/locations";

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    items: getLocationsFiltered(state, ownProps),
    data: getPlaceOrCategory(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypePlace);
