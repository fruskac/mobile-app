// @flow

import { connect } from "react-redux";
import Map from "./Map";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { getLocationsForMap } from "../../selectors/locations";
import { onFetchMap } from "../../actions/locations";


const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    locationsForMap: state.locations['map_' + state.settings.language],
    tags:
      state.settings.language == "sr"
        ? state.locations.tagsSr
        : state.locations.tagsEn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
