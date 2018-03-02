// @flow

import { connect } from "react-redux";
import Map from "./Map";
import { getLocationsForMap } from "../../selectors/locations";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    locations: getLocationsForMap(state),
    tags:
      state.settings.language == "sr"
        ? state.locations.tagsSr
        : state.locations.tagsEn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
