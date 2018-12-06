// @flow

import { connect } from "react-redux";
import LocationTypePlace from "./LocationTypePlace";
import { getLanguage } from "../../selectors/settings";
import { getLocationsFiltered, getPlaceOrCategory } from "../../selectors/locations";
import { onFetchMap } from "../../actions/locations";

const mapDispatchToProps = {onFetchMap};

const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    items: getLocationsFiltered(state, ownProps),
    data: getPlaceOrCategory(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypePlace);
