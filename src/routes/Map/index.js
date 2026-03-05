// @flow

import { connect } from "react-redux";
import Map from "./Map";
import { getLocationsForMap, getLocations } from "../../selectors/locations";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    locations: getLocationsForMap(state),
    locationItems: getLocations(state),
    tags:
      state.settings.language == "sr"
        ? state.locations.tagsSr
        : state.locations.tagsEn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
