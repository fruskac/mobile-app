// @flow

import { connect } from "react-redux";
import Map from "./Map";
import { onNavigate } from "../../actions/navigation";
import { getLocationsForMap } from "../../selectors/locations";

const mapDispatchToProps = {onNavigate};
const mapStateToProps = (state, ownProps) => {
  return {
    // locationsForMap: getLocationsForMap(state),
    tags:
      state.settings.language == "sr"
        ? state.locations.tagsSr
        : state.locations.tagsEn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
