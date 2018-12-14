// @flow

import { connect } from "react-redux";
import MapSelectedLocation from "./MapSelectedLocation";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { getLocationsForMap } from "../../selectors/locations";
import { onFetchMap } from "../../actions/locations";


const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.navigation.state.params.id,
    language: getLanguage(state),
    locationsForMap: state.locations['map_'+getLanguage(state)],
    tags:
      state.settings.language == "en"
        ? state.locations.tagsEn
        : state.locations.tagsSr
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSelectedLocation);
