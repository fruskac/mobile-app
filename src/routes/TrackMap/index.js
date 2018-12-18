// @flow

import { connect } from "react-redux";
import TrackMap from "./TrackMap";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { getTrackSingle, getLocationsForMap } from "../../selectors/locations";
import { onFetchMap } from "../../actions/locations";

const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    trackData: getTrackSingle(state, ownProps),
    id: ownProps.navigation.state.params.id,
    locationsForMap: state.locations['map_'+getLanguage(state)],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackMap);
