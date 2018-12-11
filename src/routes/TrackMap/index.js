// @flow

import { connect } from "react-redux";
import TrackMap from "./TrackMap";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { getLocationsForMap } from "../../selectors/locations";
import { onFetchMap } from "../../actions/locations";


const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    locationsForMap: state.locations['map_'+getLanguage(state)],
    tags:
      state.settings.language == "en"
        ? state.locations.tagsEn
        : state.locations.tagsSr
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackMap);
